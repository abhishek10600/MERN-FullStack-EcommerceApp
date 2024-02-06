import { myCache } from "../app.js";
import Product from "../models/productModel.js";
import { InvalidateCacheType } from "../types/types.js";

export const invalidateCache = async({product,order,admin}:InvalidateCacheType)=>{
    if (product){
        const productKeys: string[] = ["latestProducts","categories","adminAllProducts"];
        const productsIds = await Product.find().select("_id");
        productsIds.forEach((pId)=>{
            productKeys.push(`product-${pId}`);
        })
        myCache.del(productKeys);
    }
}