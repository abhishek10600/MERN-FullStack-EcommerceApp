import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import { NewProductRequestBody } from "../types/types.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";

export const newProduct = TryCatch(async(req:Request<{},{},NewProductRequestBody>,res:Response,next:NextFunction)=>{
    const {name,price,stock,category} = req.body;
    if(!name || !price || !stock || !category){
        return next(new ErrorHandler("Please enter all the require fields.",400))
    }
    if(req.file.path){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder:"fullstackecommerceapplication/products"
        }) 
        const product = await Product.create({
            name,
            photo:{
                public_id:result.public_id,
                secure_url:result.secure_url
            },
            price,
            stock,
            category
        })
        res.status(201).json({
            success:true,
            message:"Product created successfully.",
            product
        })
    }else{
        const product = await Product.create({
            name,
            price,
            stock,
            category
        })
        res.status(201).json({
            success:true,
            message:"Product created successfully.",
            product
        })
    }
})