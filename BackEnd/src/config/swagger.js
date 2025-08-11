// config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Open Data KBB API Documentation',
        version: '1.0.0',
        description: 'Dokumentasi API untuk layanan Open Data Kabupaten Bandung Barat',
    },
    servers: [
        {
            url: 'http://localhost:5000', // ganti sesuai base URL API kamu
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./controllers/*.js', './routes/*.js', './config/*.js'], // arahkan ke lokasi file yang berisi komentar Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;