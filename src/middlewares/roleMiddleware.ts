import {Response, NextFunction} from "express";
import { AuthRequest } from "./authMiddleware";
import { getUserById, ROLES } from "../models/userModel";


export const authorize = (allowedRoles:ROLES[]) =>{
    return (req:AuthRequest, res:Response, next:NextFunction) =>{
        const user = req.userId? getUserById(req.userId):undefined;

        if(!user || !allowedRoles.includes(user.role)){
            return res.status(403).json({message:'Forbidden: Insufficient rights'});
        }

        req.userId = user.id;
        next();
    }
}