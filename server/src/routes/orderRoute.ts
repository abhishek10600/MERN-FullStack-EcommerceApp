import express from "express";
import { newOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/new").post(newOrder);

export default router;