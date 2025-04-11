import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:{
        message:'Too Many request from this IP, Please try again after 15 minutes.'
    },
    standardHeaders:true,
    legacyHeaders:false,
});