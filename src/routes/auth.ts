import { NextFunction, Request, Response } from "express";
import { LoginUp, signToken, signUp }  from "../controller/authController";
import catchError from "../controller/errorController";
import AppError from "../utils/appError";

export function generateToken (req: Request, res: Response){
    const token =  signToken();
    return res.status(200).json({
      status: 'success',
      token
    });
}

export async function register(req: Request, res: Response){

  try {
    const { name, password } = req.body;

    if(!name || !password)
    {
        return catchError( new AppError("Credentials is not valid", 200), req, res);
    }

    const result = await signUp(name, password);
    return res.status(result.status).json(result);
  } catch (err) {
      return res.status(500).json({
          message: err,
          success: false,
          status: 500,
          data: null
      })
  }

}

export async function login(req: Request, res: Response){

  try {
    const { name, password } = req.body;

    if(!name || !password)
    {
        return catchError( new AppError("Credentials is not valid", 200), req, res);
    }

    const result = await LoginUp(name, password);
    return res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
      return res.status(500).json({
          message: "Error internal Server",
          success: false,
          status: 500,
          data: null
      })
  }

}