import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token, getAuthHeader } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to generate sessionId for guests (if not logged in)
  const getSessionId = () => {
    let id = localStorage.getItem("guestSessionId");
    if (!id) {
      id = "guest_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("guestSessionId", id);
    }
    return id;
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/cart/";
      if (user) {
        // For logged in users, we can use userId as sessionId (or a dedicated cart endpoint for user)
        // For simplicity, we use the same sessionId approach but now with user.id
        const sessionId = user.id;
        url += sessionId;
      } else {
        const sessionId = getSessionId();
        url += sessionId;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items || []);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const sessionId = user ? user.id : getSessionId();
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, productId, quantity }),
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const sessionId = user ? user.id : getSessionId();
      const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, productId, quantity }),
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items);
      }
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const sessionId = user ? user.id : getSessionId();
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, productId }),
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart.items);
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const clearCart = async () => {
    if (!cartItems.length) return;
    for (let item of cartItems) {
      await removeFromCart(item.product?._id || item.product);
    }
    // After loop, refresh cart (already done inside removeFromCart)
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalAmount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);