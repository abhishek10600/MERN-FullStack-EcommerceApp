import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"FullStackEcommerceApp"
    }).then(
            (c)=>console.log(`Database connected to ${c.connection.host}`)
        ).catch(
            (error)=>{
                    console.log("Connection to database failed.")
                    console.log(error);
                    process.exit(1);
                }
        )

}

export default connectDB;
