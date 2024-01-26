import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";

export const registerUser = TryCatch(
    async(
        req:Request<{},{},NewUserRequestBody>,
        res:Response,
        next:NextFunction)=>{
            const {_id,name,email,photo,gender,dob} = req.body;
            const user = await User.create({
                _id,
                name,
                email,
                photo,
                gender,
                dob:new Date(dob)
            })
            res.status(201).json({
                success:true,
                message:`Welcome ${user.name}`
            })
    }
);