import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Product name is a required field."]
        },
        photo:{
            public_id:{
                type:String,
            },
            secure_url:{
                type:String
            }
        },
        price:{
            type:Number,
            required:[true, "Product price is a required field."]
        },
        stock:{
            type:Number,
            required:[true,"Product stock is a required field."]
        },
        category:{
            type:String,
            required:[true, "Product category is a required field."]
        }
    },
    {
        timestamps:true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;