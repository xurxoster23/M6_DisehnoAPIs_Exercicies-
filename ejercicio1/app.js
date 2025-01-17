const express   =   require('express');
const { swaggerUi, specs } = require('./swaggerConfig');

const app       =   express();
const PORT      =   3000;

const alumns    =   require('./routes/alumns');
const teachers  =   require('./routes/teachers')

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/alumns',alumns);
app.use('/teachers',teachers);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
})