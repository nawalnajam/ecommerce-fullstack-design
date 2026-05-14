import express from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/adminProductController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();
router.use(protect, isAdmin);

router.post("/products", upload.single("image"), createProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;