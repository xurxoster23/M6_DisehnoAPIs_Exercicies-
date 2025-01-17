const express   =   require('express');
const app       =   express();
const port      =   3000;

app.use(express.json());

const products  =   require('./routes/products');
const users     =   require('./routes/users')

app.use('/products',products);
app.use('/users',users);
app.use('/*', (req,res) => {
    res.status(404).json({
        message: 'Incorrect route or params'
    })
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})