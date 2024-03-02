import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../utils/appError";
import catchError from "../controller/errorController";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        // if there is no token, return an error
        return next( catchError(new AppError('Authentication required', 401), req, res) );
    }
    // if there is a token, verify it
    const decoded = jwt.verify(token, config.jwtSecret);

    // if the token is invalid, return an error
    if (!decoded) {
        return next( catchError(new AppError('Invalid token', 401), req, res) );
    }
    
    // if the token is valid, set the user in the request object
    res.locals.user = JSON.parse(JSON.stringify(decoded));
    
    return next();
}
