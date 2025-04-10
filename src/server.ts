import express from "express";
import dotenv from "dotenv";
import { logRequests } from "./middlewares/loggerMiddleware";

import userRoutes from './routes/userRoute'
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const PORT =process.env.PORT || 4001

app.use(bodyParser.json());
app.use(logRequests)
app.use('/api',userRoutes);

app.listen(PORT,() =>{
    console.log('Appis litsening at Port:',PORT);
    console.log(`http://localhost:${PORT}`);
})

