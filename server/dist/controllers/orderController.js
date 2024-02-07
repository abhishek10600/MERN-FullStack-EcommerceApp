import { TryCatch } from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";
import { invalidateCache, reduceStock } from "../utils/Features.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subTotal, tax, shippingCharges, discount, total } = req.body;
    if (!shippingInfo || !orderItems || !user || !subTotal || !total) {
        return next(new ErrorHandler("All the fields are required.", 400));
    }
    const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        subTotal,
        tax,
        shippingCharges,
        discount,
        total
    });
    //reduce stock
    await reduceStock(orderItems);
    invalidateCache({ product: true, order: true, admin: true });
    return res.status(201).json({
        success: true,
        message: "Order placed successfully."
    });
});
