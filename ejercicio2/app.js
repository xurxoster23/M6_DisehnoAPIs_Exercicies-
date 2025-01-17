const express   =   require('express');
const app       =   express();
const PORT      =   3000;

const { swaggerUi, specs }  =   require('./swaggerConfig');
const players   =   require('./routes/players');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/players', players);
app.use('/*', (req,res) => {
    res.status(404).json({
        message: 'Incorrect route or params'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
})