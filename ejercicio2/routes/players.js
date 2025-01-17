/**
 * @swagger
 * tags:
 *     name: Players
 *     description: Chicago Bulls APIrest
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      Players:
 *          type: object
 *          requires:
 *              -name
 *              -number
 *              -age
 *          properties:
 *              name:
 *                  type: string
 *                  description: Player Name
 *              number:
 *                  type: number
 *                  description: Unique identifier
 *              age:
 *                  type: number
 *                  description: Player age
 */
const express   =   require('express');
const app       =   express();

const players   =   [
    {name: 'Michael Jordan', number: 23, age: 32},
    {name: 'Scottie Pippen', number: 33, age: 30},
    {name: 'Dennis Rodman', number: 91, age: 34},
];

/**
 * @swagger
 * /players/search?number:number:
 *     get:
 *      sumary: return players matched by number
 *      tags:   [Search Players]
 *      parameters: 
 *          -in: query
 *          name: number
 *          schema:
 *              type: string
 *          required: true
 *          description: Player Number
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'json response { players: <array-players> | [] }'
 *          404: 
 *              description: 'Players not found'
 *          500:
 *              description: 'Server Error'
 */
app.get('/search', (req,res) => {
    if (players.length === 0 || !req.query.number) {
        return res.status(400).json({
            message: 'Players not found'
        })
    }
    const playerSelected    =   players.filter(el => el.number === parseInt(req.query.number))
    res.status(200).json({
        messge: 'Ok',
        player: playerSelected
    })
})

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Add new player to the team
 *     tags: [Create Players] 
 *     description: Create a new player 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Player name
 *                 example: "Michael Jordan"
 *               number:
 *                 type: number
 *                 description: Player number
 *                 example: '23'
 *               age:
 *                 type: number
 *                 description: Player age
 *                 example: '32'
 *     responses:
 *       200:
 *         description: Add player sucess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 product:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Michael Jordan"
 *                     number:
 *                       type: number
 *                       example: '23'
 *                     age:
 *                       type: number
 *                       example: '23'
 *       400:
 *         description: Player body mandatory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player data mandatory"
 */
app.post('/', (req,res) => {
    // Validación del body
    const regex =   /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]+$/;
    if(!req.body || 
        regex.test(req.body.name) === false || 
        parseInt(req.body.number) === NaN ||
        parseInt(req.body.age) === NaN) {
            return res.status(400).json({
                message:    'Player data mandatory'
            })
        }
    players.push(req.body);
    res.status(200).json({
        message: 'Ok add player',
        player: players[players.length - 1]
    })    
})

module.exports  =   app;