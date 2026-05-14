import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Static saved items – can later be replaced with user’s wishlist
  const savedItems = [
    { id: "s1", name: "Regular Fit Resort Shirt", price: 57.70, img: "/cloth/1.png" },
    { id: "s2", name: "Regular Fit Resort Shirt", price: 57.70, img: "/cloth/s2.png" },
    { id: "s3", name: "Regular Fit Resort Shirt", price: 57.70, img: "/cloth/s3.png" },
  ];

  const discount = couponApplied ? -(totalAmount * 0.1) : 0;
  const tax = totalAmount * 0.05;
  const shipping = totalAmount > 50 ? 0 : 10;
  const finalTotal = totalAmount + discount + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setCouponApplied(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-5 px-4">
        <div className="text-center">
          <FaShoppingCart size={64} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <button onClick={() => navigate("/products")} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Shopping cart</h1>

        {/* Main content: flex column on mobile, row on large screens */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT / MAIN – Cart items */}
          <div className="flex-1">
            <div className="space-y-3">
              {cartItems.map((item) => {
                const productId = item.product?._id || item.product;
                const itemPrice = item.price || 0;
                const itemName = item.name || "Product";
                const seller = item.seller || "Artel Market";
                const itemImage = getImageUrl(item.image || (item.product?.image));
                return (
                  <div key={productId} className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
                    {/* Image (hidden on very small? Keep small) */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img src={itemImage} alt={itemName} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{itemName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Size: medium, Color: blue</p>
                      <p className="text-xs text-gray-500">Seller: {seller}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(productId, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center text-gray-500"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="w-7 h-7 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(productId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                        <p className="font-bold text-gray-900 text-base">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons (Back to shop / Remove all) – hidden on mobile? Screenshot doesn’t show them, but we keep them under cart */}
            <div className="flex justify-between mt-4">
              <button onClick={() => navigate("/products")} className="flex items-center gap-1 text-sm text-blue-600">
                <FaArrowLeft size={12} /> Back to shop
              </button>
              <button onClick={clearCart} className="text-sm text-red-400">Remove all</button>
            </div>
          </div>

          {/* RIGHT – Order summary + Coupon (appears below cart on mobile) */}
          <div className="w-full lg:w-96 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items ({cartCount}):</span>
                  <span className="font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping:</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${Math.abs(discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold mt-3">
                  Checkout ({cartCount} items)
                </button>
              </Link>
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                />
                <button onClick={applyCoupon} className="bg-blue-600 text-white px-4 rounded-lg text-sm">Apply</button>
              </div>
              {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
            </div>

            {/* Saved for later – vertical list on mobile, horizontal on desktop? We keep vertical for consistency */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Saved for later</h3>
              <div className="space-y-3">
                {savedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={getImageUrl(item.img)} alt={item.name} className="w-12 h-12 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <button className="text-blue-600">Move to cart</button>
                      <button className="text-red-400">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;