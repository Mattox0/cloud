import handler from '../../pages/api/movies/search';
import fetch from 'node-fetch';
import { ConfigService } from '../../src/services/config.service';
import {createMocks} from "node-mocks-http";

jest.mock('node-fetch');

describe('API Handler for Discover', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return data from the search API when successful', async () => {
        const mockData = {
            results : [
                { id: 1, title: 'Movie 1' },
                { id: 2, title: 'Movie 2' }
            ]
        };

        const { req, res } = createMocks({
            method: "GET",
            query: { query: "Test" },
        });

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockData)
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.stringify(res._getJSONData().data)).toBe(`[{"id":1,"title":"Movie 1"},{"id":2,"title":"Movie 2"}]`);
    });

    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        const { req, res } = createMocks({
            method: 'GET',
            query: { query: 'Test' },
        });

        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ status: 500, data: {message: 'Internal Server Error' }});
    });
});