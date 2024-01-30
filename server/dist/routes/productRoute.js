import express from "express";
import { newProduct } from "../controllers/productController.js";
import upload from "../middlewares/multerMiddleware.js";
const router = express.Router();
router.route("/new").post(upload.single("photo"), newProduct);
export default router;
