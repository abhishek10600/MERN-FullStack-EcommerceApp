import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import connectDB from "./config/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";


const app = express();

connectDB();

app.use(express.json())

const port = process.env.PORT;

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

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})