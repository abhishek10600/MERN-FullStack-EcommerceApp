import express from "express";
import { allOlders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/auth.js";
const router = express.Router();
router.route("/new").post(newOrder);
router.route("/myOrders").get(myOrders);
router.route("/all").get(adminOnly, allOlders);
router.route("/:orderId").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);
export default router;
