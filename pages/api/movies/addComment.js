/**
 * @swagger
 * /api/movies/addComment:
 *   post:
 *     requestBody:
 *       description: Endpoint for adding an comment from a user on a specific movie.
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - idUser
 *               - idMovie
 *               - comment
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: user identity
 *               idMovie:
 *                 type: string
 *                 description: movie identity
 *               comment:
 *                 type: string
 *                 description: comment to post
 *     responses:
 *       200:
 *         description: Success Response
 *       400:
 *         description: Error Response
 */
export default async function handler(req, res) {

    const bodyParams = req.body;

    if (bodyParams) {

        // Here your DB access and your ressource manipulation logic

        res.json({ status: 200, data: {message: "Success"} });

    }
    else {

        res.json({ status: 400, data: {message: "Error"} });

    }
}