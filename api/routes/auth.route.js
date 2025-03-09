import express from "express";
import { register, login, logout, verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-otp", verifyOTP);

export default router;
