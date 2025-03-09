import express from "express";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

// GET /api/admin/users - Get all users (admin only)
router.get("/users", verifyAdmin, getAllUsers);

// DELETE /api/admin/users/:id - Delete a user by id (admin only)
router.delete("/users/:id", verifyAdmin, deleteUser);

export default router;
