const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de API',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia según tu entorno
      },
    ],
  },
  apis: ['./routes/*.js'], // Archivos donde defines las rutas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
