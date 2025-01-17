const express   =   require('express');
const { swaggerUi, specs } = require('./swaggerConfig');

const app       =   express();
const port      =   3000;

const products          =   require('./routes/products');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/products', products);
app.use('/', (req,res) => {
    res.status(404).json({
        message:    'Incorrect route or params'
    })
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
})