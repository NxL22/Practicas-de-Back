import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "../routes/user.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import productRoutes from "../routes/product.routes.js";
import authRoutes from "../routes/auth.routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const expressApp = express();

expressApp.use(cors({
    origin: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization','reset','pos'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  }));

  const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentación',
            version: '1.0.0',
            description: 'Documentación de la API de tu aplicación',
        },
  
    },
    apis: ['./src/**/*.js'] // Asegúrate de que la ruta sea correcta
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  expressApp.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  expressApp.use(bodyParser.json({ limit: "50mb"} ));

  expressApp.use(cookieParser());
  expressApp.use(morgan("dev"));

  //aca se define el prefix de la ruta
  expressApp.use('/auth', authRoutes)
  expressApp.use('/user', userRoutes)
  expressApp.use('/admin', adminRoutes)
  expressApp.use('/product', productRoutes)
  
  expressApp.use((err, _req, res, _next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
  
    res.status(status).send(message);
  });

  export default expressApp;