import express from 'express';
import { dataError } from "../interface/error";

const catchError = (data: dataError, req: express.Request, res: express.Response) =>
{
    if(process.env.NODE_ENV = 'development')
    {
        sendErrorDev(data, res);
    }
    else if(process.env.NODE_ENV = 'production')
    {
        sendErrorProd(data, res);
    }
}

const sendErrorDev = (data: dataError, res: express.Response) =>
{
    return res.status(data.statusCode).json({
        status: data.status,
        data: {},
        message: data.message,
        stack: data.stack            
    })
}

const sendErrorProd = (data: dataError, res: express.Response) =>
{
    return res.status(data.statusCode).json({
        status: data.status,
        data: {},
        message: data.message    
    })
}

export default catchError;