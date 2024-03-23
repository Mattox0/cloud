import clientPromise from "../../../../lib/mongodb";

/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *   patch:
 *     description: "Endpoint for incrementing the like counter for a specific movie."
 *     tags:
 *      - Movies
 *     parameters:
 *         - name: idMovie
 *           in: path
 *           description: "ID of the movie."
 *           required: true
 *           type: integer
 *           format: int64
 *     responses:
 *         201:
 *           description: "Success Response"
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 201
 *               data:
 *                 type: object
 *                 properties:
 *                   action:
 *                     type: string
 *                     example: "likeCounter updated"
 *                   idMovie:
 *                     type: integer
 *                     example: 123456
 *                   matchedCount:
 *                     type: integer
 *                     example: 1
 *                   modifiedCount:
 *                     type: integer
 *                     example: 1
 *                   insertedId:
 *                     type: string
 *                     example: "6178b35e5f88dd00084eac20"
 *         400:
 *           description: "Error Response"
 *   get:
 *     description: "Endpoint for retrieving the like counter for a specific movie."
 *     tags:
 *       - Movies
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         description: "ID of the movie."
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: "Success Response"
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               example: 200
 *             data:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: object
 *                   description: "Object containing like information for the movie."
 *       400:
 *         description: "Error Response"
 *     default:
 *       description: "Method Not Allowed"
 *       schema:
 *         type: object
 *         properties:
 *           status:
 *             type: integer
 *             example: 405
 *           error:
 *             type: string
 *             example: "Method Not Allowed"
 */
export default async function handler(req, res) {

    const idMovie = parseInt(req.query.idMovie, 10);

    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case "PATCH":
            const like = await db.collection("likes").findOne({idTMDB: idMovie});
            let resMongo, data;

            if (like) {
                resMongo = await db.collection("likes").updateOne(
                    {idTMDB: idMovie},
                    { $inc: { likeCounter : 1 } }
                )
                data = {
                    action: 'likeCounter updated',
                    idMovie: idMovie,
                    matchedCount: resMongo.matchedCount,
                    modifiedCount: resMongo.modifiedCount
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, likeCounter: 0}
                )
                data = {
                    action: 'likeCounter updated',
                    idMovie: idMovie,
                    insertedId: resMongo.insertedId
                }
                res.status(201).json({ status: 201, data: data });
            }

            break;

        case "GET":
            const likes = await db.collection("likes").findOne({idTMDB: idMovie});
            res.json({ status: 200, data: { likes: likes } });
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}