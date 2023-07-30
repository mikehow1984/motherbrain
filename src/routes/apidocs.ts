import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Router } from 'express';
const r = Router();

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
    title: 'motherbrain',
    version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJSDoc(options);

r.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default r;
