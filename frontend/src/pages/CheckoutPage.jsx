import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) navigate("/signin");
    if (cartItems.length === 0) navigate("/cart");
  }, [user, cartItems]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.product?._id || item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: totalAmount,
      shippingAddress: formData,
    };
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        navigate("/orders");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-600">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Postal Code</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-600">Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 focus:border-blue-400 outline-none" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.product?._id || item.product} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                  </div>
                  <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 text-right">
              <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;