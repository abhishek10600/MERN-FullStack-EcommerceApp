import { TryCatch } from "../middlewares/errorMiddleware.js";
import Coupon from "../models/couponModel.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";

export const newCoupon = TryCatch(async(req,res,next)=>{
    const {coupon, amount} = req.body
    await Coupon.create({
        couponCode:coupon,
        amount
    })
    if(!coupon || !amount){
        return next(new ErrorHandler("Required fields are missing",400));
    }
    return res.status(201).json({
        success:true,
        message:"Coupon created successfully"
    })
})

export const applyDiscount = TryCatch(async(req,res,next)=>{
    const {coupon} = req.query
    const discount = await Coupon.findOne({couponCode:coupon});
    if (!discount){
        return next(new ErrorHandler("Coupon is invalid",400));
    }
    return res.status(200).json({
        success:true,
        message:"Discount applied.",
        discount:discount.amount
    })
})

export const allCoupons = TryCatch(async(req,res,next)=>{
    const coupons = await Coupon.find()
    return res.status(200).json({
        success:true,
        coupons
    })
})

export const deleteCoupon = TryCatch(async(req,res,next)=>{
    const {couponId} = req.params
    const coupon = await Coupon.findByIdAndDelete(couponId)
    if(!coupon){
        return next(new ErrorHandler("Invalid coupon",400));
    }
    return res.status(200).json({
        success:true,
        message:"Coupon deleted successfully."
    })
})