import fetch from "node-fetch";
import clientPromise from "/lib/mongodb";
import { ConfigService } from "../../../src/services/config.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *     get:
 *       description: "Endpoint for retrieving movie details along with the like count for a specific movie."
 *       tags:
 *          - Movies
 *       parameters:
 *         - name: idMovie
 *           in: path
 *           description: "ID of the movie."
 *           required: true
 *           type: integer
 *           format: int64
 *       responses:
 *         200:
 *           description: "Success Response"
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 200
 *               data:
 *                 type: object
 *                 properties:
 *                   movie:
 *                     type: object
 *                     description: "Object containing movie details."
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 123456
 *                       title:
 *                         type: string
 *                         example: "Movie Title"
 *                       description:
 *                         type: string
 *                         example: "Movie Description"
 *                       likes:
 *                         type: integer
 *                         example: 5
 *         404:
 *           description: "Not Found"
 *         405:
 *           description: "Method Not Allowed"
 */
export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = ConfigService.themoviedb.urls.movie + '/' + idMovie;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {

        case "GET":
            const movie = await fetch(url, options)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));

            const likes = await db.collection("likes").findOne({idTMDB: idMovie});

            if (likes?.likeCounter) {
                movie.likes = likes.likeCounter;
            } else {
                movie.likes = 0;
            }

            if (movie) {
                res.json({ status: 200, data: { movie: movie } });
            } else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}