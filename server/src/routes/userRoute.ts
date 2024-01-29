import express from "express";
import { registerUser,getAllUsers,getUserById,deleteUser } from "../controllers/userController.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

//api/v1/users
router.route("/register").post(registerUser);
router.route("/all").get(adminOnly,getAllUsers);
router.route("/:id").get(getUserById).delete(adminOnly,deleteUser);


export default router;