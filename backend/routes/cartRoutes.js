import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:sessionId", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.post("/remove", removeFromCart);

export default router;