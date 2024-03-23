import {ConfigService} from "../../src/services/config.service";
import fetch from "node-fetch";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *     - Movies
 *     description: Returns movies
 *     responses:
 *       200:
 *         description: Hello Movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: "Internal Server Error"
 */
export default async function handler(req, res) {
    try {
        const url = ConfigService.themoviedb.urls.discover;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
            }
        };

        const apiResponse = await fetch(url, options)
            .then(r => r.json());

        if (apiResponse && apiResponse.results) {
            res.status(200).json({ status: 200, data: apiResponse.results });
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
}