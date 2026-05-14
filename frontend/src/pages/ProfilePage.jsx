import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaCheck, FaTimes } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [message, setMessage] = useState("");
  const [orders] = useState([
    { id: "ORD-001", date: "2024-03-15", total: "$129.99", status: "Delivered", items: 2 },
    { id: "ORD-002", date: "2024-03-10", total: "$89.50", status: "Processing", items: 1 },
    { id: "ORD-003", date: "2024-03-05", total: "$245.00", status: "Shipped", items: 3 },
  ]);
  const [wishlist] = useState([
    { id: 1, name: "GoPro HERO8 4K Camera", price: "$99.50", img: "/tech/6.jpg" },
    { id: 2, name: "Smart Watch Series 7", price: "$199.00", img: "/tech/8.jpg" },
    { id: 3, name: "Wireless Headphones", price: "$49.99", img: "/tech/9.jpg" },
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      setEditName(user.name || "");
      setEditEmail(user.email || "");
    }
  }, [user, navigate]);

  const handleUpdateProfile = async () => {
    setEditing(false);
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  if (!user) return null;

  const statusColor = {
    Delivered: "text-green-600 bg-green-50",
    Processing: "text-yellow-600 bg-yellow-50",
    Shipped: "text-blue-600 bg-blue-50",
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Success/Error Message */}
        {message && (
          <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  <FaUser />
                </div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-blue-100">{user.email}</p>
              </div>
              <div className="p-4 space-y-1">
                {[
                  { id: "profile", icon: <FaUser />, label: "My Profile" },
                  { id: "orders", icon: <FaShoppingBag />, label: "Order History" },
                  { id: "wishlist", icon: <FaHeart />, label: "Wishlist" },
                  { id: "settings", icon: <FaCog />, label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition mt-4"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* My Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="border-b px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handleUpdateProfile} className="text-green-600 hover:text-green-700">
                        <FaCheck size={18} />
                      </button>
                      <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-600">
                        <FaTimes size={18} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-400 outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      {editing ? (
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-400 outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">{user.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                      <p className="text-gray-800 font-medium">
                        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="border-b px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                </div>
                <div className="divide-y">
                  {orders.map((order) => (
                    <div key={order.id} className="p-5 hover:bg-gray-50 transition">
                      <div className="flex flex-wrap justify-between items-center gap-3">
                        <div>
                          <p className="font-bold text-gray-800">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}>
                          {order.status}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{order.total}</p>
                          <button className="text-sm text-blue-600 hover:underline">View Details →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="border-b px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800">My Wishlist</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border rounded-xl p-3 hover:shadow-md transition">
                      <img src={item.img} alt={item.name} className="h-28 w-full object-contain mb-2" />
                      <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                      <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded-lg text-xs hover:bg-blue-700 transition">
                        Move to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="border-b px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                    <input type="password" placeholder="Current Password" className="w-full border rounded-lg px-4 py-2 mb-3 outline-none focus:border-blue-400" />
                    <input type="password" placeholder="New Password" className="w-full border rounded-lg px-4 py-2 mb-3 outline-none focus:border-blue-400" />
                    <input type="password" placeholder="Confirm New Password" className="w-full border rounded-lg px-4 py-2 mb-4 outline-none focus:border-blue-400" />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      Update Password
                    </button>
                  </div>
                  <div className="border-t pt-6">
                    <p className="text-sm text-gray-500 mb-3">Newsletter Preferences</p>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-blue-600" defaultChecked />
                      <span className="text-sm">Receive exclusive offers and updates via email</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;