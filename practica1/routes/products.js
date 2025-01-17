const express   =   require('express');
const app       =   express();

const products  =   [
    {id: 1, sku: 'A001', item: 'Macbook Air 13', description: 'Lorem Ipsum ....'},
    {id: 2, sku: 'A023', item: 'Ipad Pro', description: 'Lorem Ipsum ....'},
    {id: 3, sku: 'A033', item: 'Xiaomi Redmi 9', description: 'Lorem Ipsum ....'}
];

app.get('/', (req, res) => {
    res.status(200).json({
        message:    'Ok',
        products
    })
})

module.exports  =   app;