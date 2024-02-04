import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody{
    _id:string;
    name:string;
    email:string;
    photo?:object;
    gender:string;
    dob:Date;
}

export interface TestRequestBody{
    name:string;
}

export interface NewProductRequestBody{
    name:string;
    photo?:object;
    price:number;
    stock:number;
    category:number;
}

export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction) => Promise<void | Response<any, Record<string,any>>>;