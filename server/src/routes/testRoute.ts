import express from "express";
import { testupload } from "../controllers/testController.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/uploadImage").post(upload.single("photo"),testupload);

export default router;