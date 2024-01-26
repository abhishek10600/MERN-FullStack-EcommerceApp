import { User } from "../models/userModel.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";
export const registerUser = TryCatch(async (req, res, next) => {
    const { _id, name, email, photo, gender, dob } = req.body;
    const user = await User.create({
        _id,
        name,
        email,
        photo,
        gender,
        dob: new Date(dob)
    });
    res.status(201).json({
        success: true,
        message: `Welcome ${user.name}`
    });
});
