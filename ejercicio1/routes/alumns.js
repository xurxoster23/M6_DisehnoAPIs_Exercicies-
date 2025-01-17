/**
 * @swagger
 * tags:
 *     name: Alumns
 *     description: Highschool APIrest
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      Alumns:
 *          type: object
 *          requires:
 *              -dni
 *              -name
 *              -surname
 *          properties:
 *              dni:
 *                  type: string
 *                  description: Unique identifier
 *              name:
 *                  type: string
 *                  description: Teacher name
 *              surname:
 *                  type: string
 *                  description: Alumns second name
 */
const express   =   require('express');
const app       =   express();

const alumns    =   [
    {dni: '44433698K', name: 'Jorge', surname: 'Borrego'},
    {dni: '58974566G', name: 'Andrea', surname: 'Roa'},
    {dni: '78466213B', name: 'Thiago', surname: 'Borrego'}
]
/**
 * @swagger
 * /alumns:
 *     get:
 *      sumary: return alumns 
 *      tags:   [Alumns list]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'json response { alumns: <array-alumns> | [] }'
 */
app.get('/', (req,res) => {
    res.status(200).json({
        message: 'ok',
        alumns
    })
})

module.exports  =   app;