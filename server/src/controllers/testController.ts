import { NextFunction, Request, Response } from "express";
import { TestRequestBody } from "../types/types.js";
import cloudinary from "../config/cloudinaryConfig.js";

export const testupload = async(
    req:Request<{},{},TestRequestBody>,
    res:Response,
    next:NextFunction)=>{
        try {
            const {name} = req.body;
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder:"fullstackecommerceapplication/test"
            })
            res.status(200).json({
                success:true,
                message:"Image uploaded successfully.",
                name,
                data:{
                    secure_url:result.secure_url,
                    public_id:result.public_id
                }
            })

        } catch (error) {
            
        }

}