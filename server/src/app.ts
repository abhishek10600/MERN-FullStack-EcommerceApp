import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import express from "express";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import connectDB from "./config/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import NodeCache from "node-cache";


const app = express();

const mongoURI = process.env.MONGODB_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

app.use(express.json())

const port = process.env.PORT || 4000;

//testing
app.get("/test",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Api is working"
    })
})


//user Route
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments",paymentRouter);

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})