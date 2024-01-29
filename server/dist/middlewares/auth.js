import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import { TryCatch } from "./errorMiddleware.js";
export const adminOnly = TryCatch(async (req, res, next) => {
    const { userId } = req.query;
    if (!userId) {
        return next(new ErrorHandler("Please login.", 401));
    }
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 401));
    }
    if (user.role !== "admin") {
        return next(new ErrorHandler("You are not authorized for this feature.", 404));
    }
    next();
});
