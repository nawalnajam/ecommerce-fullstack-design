import express from "express";
import { getUserConversations, getMessages } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.get("/", getUserConversations);
router.get("/:conversationId", getMessages);

export default router;