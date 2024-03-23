import bcrypt from 'bcrypt';
import clientPromise from "../../../lib/mongodb";
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     description: Login with email and password
 *     tags:
 *      - Auth
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email
 *                          format: email
 *                          example: "example@gmail.com"
 *                          required: true
 *                          unique: true
 *                      password:
 *                          type: string
 *                          description: The user password
 *                          format: password
 *                          example: "password"
 *                          required: true
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: The request status
 *                                  example: true
 *                                  required: true
 *                                  unique: true
 *                              token:
 *                                  type: string
 *                                  description: The user token
 *                              userData:
 *                                  type: object
 *                                  description: The user data
 *                                  properties:
 *                                      username:
 *                                          type: string
     *                                      description: The user username
     *                                      example: "username"
     *                                      required: true
 *                                      email:
 *                                          type: string
 *                                          description: The user email
 *                                          example: "mattox@gmail.com"
 */
export default async function handler(req, res) {
    const { email, password } = req.body

    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case 'POST':
            try {
                if (!email || !password) {
                    res.status(400).json({status: 400, error: 'Bad Request'})
                }
                let user = await db.collection("users").findOne({email: email});
                if (!user) {
                    return res.status(403).json({status: 403, error: 'Unauthorized'});
                }
                if (!await bcrypt.compare(password, user.password)) {
                    return res.status(403).json({status: 403, error: 'Unauthorized'});
                }
                let token = await jwt.sign({username: user.username}, process.env.JWT_SECRET, { expiresIn: '7d'});
                res.status(200).json({
                    success: true,
                    token: token,
                    userData: {username: user.username, email: user.email}
                })
                return;
            } catch (e) {
                console.error(e);
                res.status(500).json({status: 500, error: 'Internal Server Error'});
                return;
            }
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
            return;
    }
}