import express from "express";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from "../controllers/statsController.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();


router.route("/stats").get(getDashboardStats);
router.route("/pie").get(adminOnly,getPieCharts);
router.route("/bar").get(adminOnly,getBarCharts);
router.route("/line").get(adminOnly,getLineCharts);


export default router;