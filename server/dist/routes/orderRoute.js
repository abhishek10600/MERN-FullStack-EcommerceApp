import express from "express";
import { allOlders, getSingleOrder, myOrders, newOrder } from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/auth.js";
const router = express.Router();
router.route("/new").post(newOrder);
router.route("/myOrders").get(myOrders);
router.route("/all").get(adminOnly, allOlders);
router.route("/:orderId").get(getSingleOrder);
export default router;
