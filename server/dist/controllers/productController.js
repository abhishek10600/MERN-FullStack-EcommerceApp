import { TryCatch } from "../middlewares/errorMiddleware.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
//admin feature
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    if (!name || !price || !stock || !category) {
        return next(new ErrorHandler("Please enter all the require fields.", 400));
    }
    if (req.file?.path) {
        const result = await cloudinary.uploader.upload(req.file?.path, {
            folder: "fullstackecommerceapplication/products"
        });
        const product = await Product.create({
            name,
            photo: {
                public_id: result.public_id,
                secure_url: result.secure_url
            },
            price,
            stock,
            category
        });
        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });
    }
    else {
        const product = await Product.create({
            name,
            price,
            stock,
            category
        });
        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });
    }
});
export const getLatestProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
        success: true,
        products
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category");
    res.status(200).json({
        success: true,
        categories
    });
});
//admin feature
export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product does not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    });
});
//admin feature
export const updateProduct = TryCatch(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const { name, price, stock, category } = req.body;
    const photo = req.file?.path;
    if (photo) {
        let newPhoto = {};
        if (product.photo?.public_id) {
            await cloudinary.uploader.destroy(product.photo.public_id);
        }
        const result = await cloudinary.uploader.upload(photo, {
            folder: "fullstackecommerceapplication/products"
        });
        newPhoto.public_id = result.public_id;
        newPhoto.secure_url = result.secure_url;
        product.photo = newPhoto;
    }
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (stock) {
        product.stock = stock;
    }
    if (category) {
        product.category = category;
    }
    await product.save();
    res.status(200).json({
        success: true,
        message: "product updated successfully.",
        product
    });
});
//admin feature
export const deleteProduct = TryCatch(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }
    if (product.photo?.public_id) {
        await cloudinary.uploader.destroy(product.photo.public_id);
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    });
});
