export const errorMiddleware = (error, req, res, next) => {
    error.message = error.message || "Internal Server Error.";
    error.statusCode = error.statusCode || 500;
    return res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};
export const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next));
    };
};
