import { User } from "../models/userModel.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
export const registerUser = TryCatch(async (req, res, next) => {
    const { _id, name, email, photo, gender, dob } = req.body;
    if (!_id || !name || !email || !gender || !dob) {
        return next(new ErrorHandler("Please enter the required fields.", 400));
    }
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.name}`
        });
    }
    user = await User.create({
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
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    });
});
export const getUserById = TryCatch(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler("Invalid id", 400));
    }
    res.status(200).json({
        success: true,
        user
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid id", 400));
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "User delete successfully."
    });
});
