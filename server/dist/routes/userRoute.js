import express from "express";
import { registerUser, getAllUsers, getUserById, deleteUser } from "../controllers/userController.js";
const router = express.Router();
//api/v1/users
router.route("/register").post(registerUser);
router.route("/all").get(getAllUsers);
router.route("/:id").get(getUserById).delete(deleteUser);
export default router;
