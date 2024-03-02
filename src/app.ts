import express from 'express';
import cors from 'cors';
import AppError from './utils/appError';
import router from "./routes"; 
import catchError from './controller/errorController';

const app: express.Application = express();

app.use( express.json({ limit: '10kb' }));
app.use( express.urlencoded({ extended: true }) );
app.use( cors() );
app.use("/api", router);
app.use('*', (
    req: express.Request,
    res: express.Response
    )=> catchError( new AppError(`No se ha encontrado la pagina: ${req.originalUrl}`, 404), req, res) );

export default app;