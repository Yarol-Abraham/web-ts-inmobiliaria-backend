import { sign } from "jsonwebtoken";
import config from '../config';
import { correctPassword, hashPassword } from "../utils/functions";
import prisma from '../database';

export const signToken = ()=> {
    return sign({id: config.id }, config.jwtSecret, {
      expiresIn: config.jwtExpire
    });
};
const sendResponse = (status: number, data: any, message: string)=> {
  return {
    status,
    message,    
    data
  }
};

export const signUp = async ( name: string, password: string) => {
 
  // hash the password
  const hashedPassword = await hashPassword(password);
  const created = await prisma.user.create({
      data: {
          name: name,
          password: hashedPassword
      }
  });
  return sendResponse(201, created, "User created successfully");
}


export const LoginUp = async (name: string, password: string)=>{

  if(!name || !password) return sendResponse(401, null, "Please provide your name and password.");

  const user = await prisma.user.findUnique({
    where: {
      name
    },
  });

  if(!user) return sendResponse(401, null, "The user not exist.");
 ;
  const verifyPassword = await correctPassword(password, user.password);
  
  if(!verifyPassword) return sendResponse(400, null, "wrong name or password.");
  
  const token =  signToken();

  return sendResponse(200, {token, user: { name: user.name, id: user.id  }}, "success");
};

