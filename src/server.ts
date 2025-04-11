import express from "express";
import {Request, Response, NextFunction, RequestHandler} from "express";
import dotenv from "dotenv";
import { logRequests } from "./middlewares/loggerMiddleware";
import cors from "cors";
import {delOrigin} from "./middlewares/corsMiddleware";
import { apiLimiter } from "./middlewares/rateLimiterMiddleware";
import userRoutes from './routes/userRoute'
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const PORT =process.env.PORT || 4001

app.use(apiLimiter);
app.use(delOrigin as any);
app.use(cors())
app.use(bodyParser.json());
app.use(logRequests)
app.use('/api',userRoutes);

app.listen(PORT,() =>{
    console.log('Appis litsening at Port:',PORT);
    console.log(`http://localhost:${PORT}`);
})

