import express from "express"
import {adminOnly} from "../middlewares/auth.js"
import { allCoupons, applyDiscount, deleteCoupon, newCoupon } from "../controllers/paymentController.js"

const router = express.Router()

router.route("/coupons/new").post(adminOnly,newCoupon)
router.route("/coupons/all").get(adminOnly,allCoupons)
router.route("/coupons/:couponId").delete(adminOnly,deleteCoupon)

router.route("/discount").get(applyDiscount)

export default router