import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WishlistHeart = ({ productId, size = 16, className = "" }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const liked = isInWishlist(productId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Heart clicked, productId:", productId, "user:", user);
    if (!user) {
      console.log("No user, redirecting to signin");
      navigate("/signin");
      return;
    }
    setLoading(true);
    try {
      if (liked) {
        console.log("Removing from wishlist");
        await removeFromWishlist(productId);
      } else {
        console.log("Adding to wishlist");
        await addToWishlist(productId);
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${className} focus:outline-none`}
      style={{ cursor: "pointer" }}
    >
      {liked ? (
        <FaHeart size={size} className="text-red-500" />
      ) : (
        <FaRegHeart size={size} className="text-gray-400 hover:text-red-400 transition" />
      )}
    </button>
  );
};

export default WishlistHeart;