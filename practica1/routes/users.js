const express   =   require('express');
const app       =   express();

const users =   [
    {id: 1, name: 'Laura', surname: 'Gómez'},
    {id: 2, name: 'Jua', surname: 'Pérez'},
    {id: 3, name: 'Carlos', surname: 'López'}
];

app.get('/:id', (req,res) => {
    const user  =   users.filter(el => parseInt(req.params.id) === el.id)
    res.status(200).json({
        message:    'Ok',
        user:   user[0]
    })
})

module.exports  =   app;