import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document{
    _id:string;
    name:string;
    email:string;
    photo:object;
    role:"admin" | "user";
    gender: "male" | "female" | "other";
    dob:Date;
    createdAt:Date;
    updatedAt:Date;
    // Virtual Attribute
    age:number;
}

const userSchema = new mongoose.Schema(
    {
        _id:{
            type:String,
            required:[true,"Please enter ID"],
        },
        name:{
            type:String,
            required:[true,"Please enter name"]
        },
        email:{
            type:String,
            required:[true,"Please enter email"],
            unique:[true, "User with this email already exists"],
            validate: validator.default.isEmail
        },
        photo:{
            public_id:{
                type:String
            },
            secure_url:{
                type:String
            }
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        gender:{
            type:String,
            enum:["male", "female", "other"],
            required:[true,"Please enter gender"]
        },
        dob:{
            type:Date,
            required:[true,"Please enter DOB"]
        }
    },
    {
        timestamps:true,
    }
)

userSchema.virtual("age").get(function(){
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if(today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()){
        age--;
    }
    return age;
})

export const User = mongoose.model<IUser>("User",userSchema);