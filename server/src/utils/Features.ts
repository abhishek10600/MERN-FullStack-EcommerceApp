import { myCache } from "../app.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { InvalidateCacheType, OrderItemsType } from "../types/types.js";

export const invalidateCache = async({product,order,admin,userId}:InvalidateCacheType)=>{
    if (product){
        const productKeys: string[] = ["latestProducts","categories","adminAllProducts"];
        const productsIds = await Product.find().select("_id");
        productsIds.forEach((pId)=>{
            productKeys.push(`product-${pId}`);
        })
        myCache.del(productKeys);
    }
    if(order){
        const orderKeys:string[] = ["all-orders","my-orders-${userId}"];
        const ordersIds = await Order.find().select("_id");
        ordersIds.forEach((oId)=>{
            orderKeys.push(`order-${oId._id}`)
        })
        myCache.del(orderKeys);
    }
    if(admin){
        
    }
}

export const reduceStock = async(orderItems:OrderItemsType[])=>{
    try {
        for (let i = 0;i < orderItems.length;i++){
            const order = orderItems[i];
            const product = await Product.findById(order.productId);
            if(!product){
                throw new Error("Product not found.");
            }
            product.stock = product.stock - order.quantity
            product.save()
        }
    } catch (error:any) {
        console.log(error.message)
    }
}