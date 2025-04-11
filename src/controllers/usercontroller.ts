import {Request, Response, RequestHandler} from "express";
import jwt from "jsonwebtoken";
import { getUserById,ROLES } from "../models/userModel";
import { AuthRequest } from "../middlewares/authMiddleware";



export const login = (req: Request, res: Response): Response => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const user = getUserById(userId);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid user ID' });
    }
  
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not set in environment variables');
    }
  
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
  
    return res.json({ token });
  };


export const getAdminData = (req:AuthRequest, res:Response) => {
    res.json({message:'Welcome Admin!',user:req.userId})
     
}
export const getUserData = (req:AuthRequest, res:Response) => {
    res.json({message:'Welcome User!',user:req.userId})
     
}

export const getGuestData = (req:AuthRequest, res:Response) => {
    res.json({message:'Welcome Guest!',user:req.userId})
     
}