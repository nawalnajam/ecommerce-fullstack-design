import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, token, getAuthHeader } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: { ...getAuthHeader() },
      });
      const data = await res.json();
      if (data.success) setWishlist(data.wishlist);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) return false;
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchWishlist();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return false;
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() },
      });
      const data = await res.json();
      if (data.success) {
        fetchWishlist();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId?._id === productId || item.productId === productId);
  };

  useEffect(() => {
    if (user) fetchWishlist();
    else setWishlist([]);
  }, [user]);

  return (
    <WishlistContext.Provider value={{
      wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);