import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(
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
