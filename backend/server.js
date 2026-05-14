import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { seedAdmin } from "./config/seedAdmin.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin();

    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Serve uploaded images statically
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));

    // Routes
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/messages", messageRoutes);
    app.use("/api/wishlist", wishlistRoutes);
    app.use("/api/admin", adminRoutes);

    app.get("/", (req, res) => res.json({ message: "API running" }));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });