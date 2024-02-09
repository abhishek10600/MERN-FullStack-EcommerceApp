import { TryCatch } from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";
import { invalidateCache, reduceStock } from "../utils/Features.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import { myCache } from "../app.js";
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
export const myOrders = TryCatch(async (req, res, next) => {
    const { userId } = req.query;
    const key = `my-orders-${userId}`;
    let orders = [];
    if (myCache.has(key)) {
        orders = JSON.parse(myCache.get(key));
    }
    else {
        orders = await Order.find({ user: userId });
        myCache.set("", JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders
    });
});
export const allOlders = TryCatch(async (req, res, next) => {
    const key = `all-orders`;
    let orders = [];
    if (myCache.has(key)) {
        orders = JSON.parse(myCache.get(key));
    }
    else {
        orders = await Order.find().populate("user", "name");
        myCache.set(key, JSON.stringify(orders));
    }
    res.status(200).json({
        success: true,
        orders
    });
});
export const getSingleOrder = TryCatch(async (req, res, next) => {
    const { orderId } = req.params;
    const key = `order-${orderId}`;
    let order;
    if (myCache.has(key)) {
        JSON.parse(myCache.get(key));
    }
    else {
        order = await Order.findById(orderId).populate("user", "name");
        if (!order) {
            return next(new ErrorHandler("Order not found.", 400));
        }
        myCache.set(key, JSON.stringify(order));
        res.status(200).json({
            success: true,
            order
        });
    }
});
