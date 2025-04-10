import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { decode } from "punycode";


export interface AuthRequest extends Request{
    userId?:string
}


export const verifyToken = (req:AuthRequest, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message:'Token is required'});

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token,process.env.JWT_SECRET as string,(err, decode:any) =>{
        if(err) return res.status(403).json({message:'Invalid token'});
        req.userId = decode.userId;
        next();
    });
    
};