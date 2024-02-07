import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        shippingInfo:{
            address:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            },
            pinCode:{
                type:Number,
                required:true
            }
        },
        user:{
            type:String,
            ref:"User",
            required:true
        },
        subTotal:{
            type:Number,
            required:true
        },
        tax:{
            type:Number,
            required:true
        },
        shippingCharges:{
            type:Number,
            required:true
        },
        discount:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["proccessing", "shipping", "delivered"],
            default: "proccessing"
        },
        orderItems:[
            {
                name:{
                    type:String,
                },
                photo:{
                    secure_url:{
                        type:String
                    }
                },
                price:{
                    type:Number
                },
                quantity:{
                    type:Number
                },
                productId:{
                    type:mongoose.Types.ObjectId,
                    ref:"Product"
                }
            }
        ]
    },
    {
        timestamps:true
    }
)

const Order = mongoose.model("Order",orderSchema);

export default Order;