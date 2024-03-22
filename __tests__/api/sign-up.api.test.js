import handler from '../../pages/api/auth/sign-up';
import jwt from 'jsonwebtoken';
import { createMocks } from 'node-mocks-http';
import mongodb from '../../lib/mongodb';

// Utilisez le mock pour jest.mock
jest.mock('../../lib/mongodb', () => ({
    __esModule: true,
    default: {
        then: jest.fn().mockImplementation((callback) => callback({
            db: jest.fn(() => ({
                collection: jest.fn(() => ({
                    findOne: jest.fn(async ({ $or }) => {
                        if ($or.some(criteria => criteria.email === 'test@example.com' || criteria.username === 'test_username')) {
                            return {
                                email: 'test@example.com',
                                password: 'mocked_hashed_password',
                                username: 'test_username',
                                firstName: 'Test',
                                lastName: 'User'
                            };
                        } else {
                            return null; // User not found
                        }
                    }), // Utilisateur non trouvé pour les tests
                    insertOne: jest.fn(async () => ({ username: 'test_username', email: 'test@example.com', password: 'test_password', firstName: 'Test', lastName: 'User' })),
                })),
            })),
        })),
    },
}));

// Mock bcrypt
jest.mock('bcrypt', () => ({
    hash: jest.fn(async () => 'mocked_hashed_password'),
}));

// Mock jwt
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mocked_token'),
}));

describe('API Handler for Sign-Up', () => {
    it('should create a new user and return token when sign-in is successful', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'realtest@example.com',
                password: 'password',
                username: 'username',
                firstName: 'Test',
                lastName: 'User'
            }
        });

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({
            success: true,
            token: 'mocked_token',
            userData: {
                username: 'test_username',
                email: 'test@example.com'
            }
        });
    });

    it('should return error when required fields are missing', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {} // Champs requis manquants
        });

        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ status: 400, error: 'Bad Request' });
    });

    it('should return error when user already exists', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
                password: 'test_password',
                username: 'test_username',
                firstName: 'Test',
                lastName: 'User'
            }
        });

        await handler(req, res);

        expect(res.statusCode).toBe(409);
        expect(res._getJSONData()).toEqual({ status: 409, error: 'User already exists' });
    });
});
