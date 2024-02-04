import express from "express";
import { newProduct,
    getLatestProducts,
    getAllCategories,
    getAdminProducts, 
    getSingleProduct, 
    updateProduct,
    deleteProduct} from "../controllers/productController.js";
import {adminOnly} from "../middlewares/auth.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/new").post(adminOnly,upload.single("photo"),newProduct);
router.route("/latest").get(getLatestProducts);
router.route("/categories").get(getAllCategories);
router.route("/admin-products").get(adminOnly,getAdminProducts);
router.route("/:productId").get(getSingleProduct).put(adminOnly,upload.single("photo"),updateProduct).delete(adminOnly,deleteProduct);

export default router;