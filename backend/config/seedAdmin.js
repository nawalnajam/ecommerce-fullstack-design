import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim();
    const plainPassword = process.env.ADMIN_PASSWORD?.trim();
    const name = process.env.ADMIN_NAME?.trim() || "Admin";

    if (!email || !plainPassword) {
      console.log("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
      return;
    }

    // Hash the plain password once
    const hashed = await bcrypt.hash(plainPassword, 10);

    // Use updateOne with upsert – this does NOT trigger the model's pre‑save hook
    await User.updateOne(
      { email },
      {
        $set: {
          name,
          email,
          password: hashed,
          isAdmin: true,
        },
      },
      { upsert: true }
    );

    console.log(`✅ Admin user synced (password hashed once): ${email}`);
  } catch (err) {
    console.error("❌ Admin seed error:", err.message);
  }
};