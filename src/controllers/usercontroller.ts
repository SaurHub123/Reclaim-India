import {Request, Response, RequestHandler} from "express";
import jwt from "jsonwebtoken";
import { getUserById,ROLES } from "../models/userModel";
import { AuthRequest } from "../middlewares/authMiddleware";
import { User, IUser } from "../configs/mongoDB/schema";
import { logger } from '../utils/logger';



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


export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      country,
      state,
      dist,
      landmark,
      houseNo,
      alternateNumber,
      walletId,
    } = req.body;

    // Check if email or phone or walletId already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }, { walletId }]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with given email, phone, or walletId already exists' });
    }

    const newUser: IUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      phone,
      country,
      state,
      dist,
      landmark,
      houseNo,
      alternateNumber,
      walletId,
    });

    const savedUser = await newUser.save();

    // Optional logger
    logger.info(`✅ User registered: ${email}`);

    return res.status(201).json({
      message: 'User registered successfully',
      data: savedUser
    });
  } catch (error) {
    logger.error(`❌ User registration failed: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
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