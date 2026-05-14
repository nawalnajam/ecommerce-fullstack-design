import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("products.productId");
    if (!wishlist) wishlist = { products: [] };
    res.json({ success: true, wishlist: wishlist.products || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) wishlist = new Wishlist({ userId: req.user.id, products: [] });

    const alreadyExists = wishlist.products.some(p => p.productId.toString() === productId);
    if (alreadyExists) {
      return res.json({ success: true, message: "Already in wishlist", wishlist: wishlist.products });
    }

    wishlist.products.push({ productId });
    await wishlist.save();
    res.json({ success: true, message: "Added to wishlist", wishlist: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) return res.json({ success: true, wishlist: [] });

    wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);
    await wishlist.save();
    res.json({ success: true, message: "Removed from wishlist", wishlist: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};