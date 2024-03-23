import fetch from "node-fetch";
import { ConfigService } from "../../../src/services/config.service";

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     description: Endpoint which return the filtered part of movies to display
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         type: string
 *         description: the search query
 *       - in: query
 *         name: page
 *         required: false
 *         type: integer
 *         description: Number of current page to display on movies list
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     results:
 *                       type: array
 *                       items:
 *                          type: object
 *       400:
 *         description: "Error Response"
 */
export default async function handler(req, res) {
    const queryParams = req.query;
    if (queryParams && queryParams?.query) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
            }
        };
        const url = ConfigService.themoviedb.urls.search + '?query=' + queryParams.query + '&page=' + (queryParams.page ? queryParams.page : 1) + '&include_adult=false';
        try {
            const movies = await fetch(url, options)
                .then(r => r.json());

            if (movies && movies.results) {
                return res.status(200).json({ status: 200, data: movies.results });
            } else {
                throw new Error('Invalid API response');
            }
        } catch (e) {
            return res.status(500).json({ status: 500, data: {message: "Internal Server Error"} });
        }
    }
    else {
        res.json({ status: 400, data: {message: "Bad Request"} });
    }
}