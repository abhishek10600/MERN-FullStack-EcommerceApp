import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody{
    _id:string;
    name:string;
    email:string;
    photo?:object;
    gender:string;
    dob:Date;
}

export interface NewProductRequestBody{
    name:string;
    photo?:object;
    price:number;
    stock:number;
    category:number;
}

export type OrderItemsType = {
    name:string;
    photo?:object;
    price:number;
    quantity:number;
    productId:string;
}

export type ShippingInfoType = {
    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:number;
}

export interface NewOrderRequestBody{
    shippingInfo:ShippingInfoType;
    user:string;
    subTotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    orderItems:OrderItemsType[];
}

export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction) => Promise<void | Response<any, Record<string,any>>>;


export type SearchRequestQuery = {
    search?:string;
    price?:string;
    category?:string;
    sort?:string;
    page?:string;
}

export interface BaseQuery{
    name?:{
        $regex:string;
        $options:string;
    };
    price?:{
        $lte:number;
    };
    category?:string
}

export type PhotoType = {
    public_id?:string;
    secure_url?:string;
}

export type InvalidateCacheType = {
    product?:boolean;
    order?:boolean;
    admin?:boolean;
}