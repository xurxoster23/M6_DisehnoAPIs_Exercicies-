/**
 * @swagger
 * tags:
 *     name: Products
 *     description: Products API REST
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      Teachers:
 *          type: object
 *          requires:
 *              -dni
 *              -name
 *              -subject
 *          properties:
 *              dni:
 *                  type: string
 *                  description: Unique identifier
 *              name:
 *                  type: string
 *                  description: Teacher name
 *              subject:
 *                  type: string
 *                  description: Type of subject taught by the teacher
 */
const express   =   require('express');
const app       =   express();

const teachers    =   [
    {dni: '44433698K', name: 'Jorge',  subject: 'English'},
    {dni: '58974566G', name: 'Andrea', subject: 'Mathematics'},
    {dni: '78466213B', name: 'Thiago', subject: 'Physics'}
]
/**
 * @swagger
 * /teachers:
 *     get:
 *      sumary: return teachers 
 *      tags:   [Teachers list]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'json response { teachers: <array-teachers> | [] }'
 */
app.get('/', (req,res) => {
    res.status(200).json({
        message: 'ok',
        teachers
    })
})

module.exports  =   app;