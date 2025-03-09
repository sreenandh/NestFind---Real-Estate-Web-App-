import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getChats,
  getChat,
  createOrGetChat,
  readChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

// Get all chats for the logged-in user
router.get("/", verifyToken, getChats);

// Get a specific chat by ID
router.get("/:id", verifyToken, getChat);

// Create or get an existing chat
router.post("/create-or-get", verifyToken, createOrGetChat);

// Mark a chat as read
router.put("/read/:id", verifyToken, readChat);

export default router;