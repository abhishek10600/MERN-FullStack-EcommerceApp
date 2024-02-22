import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, "Coupon code is a required field."],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is a required field."],
        unique: true
    }
});
const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
