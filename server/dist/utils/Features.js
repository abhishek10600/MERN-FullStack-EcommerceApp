import { myCache } from "../app.js";
import Product from "../models/productModel.js";
export const invalidateCache = async ({ product, order, admin }) => {
    if (product) {
        const productKeys = ["latestProducts", "categories", "adminAllProducts"];
        const productsIds = await Product.find().select("_id");
        productsIds.forEach((pId) => {
            productKeys.push(`product-${pId}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
export const reduceStock = async (orderItems) => {
    try {
        for (let i = 0; i < orderItems.length; i++) {
            const order = orderItems[i];
            const product = await Product.findById(order.productId);
            if (!product) {
                throw new Error("Product not found.");
            }
            product.stock = product.stock - order.quantity;
            product.save();
        }
    }
    catch (error) {
        console.log(error.message);
    }
};
