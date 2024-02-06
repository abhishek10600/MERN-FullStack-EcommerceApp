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
};
