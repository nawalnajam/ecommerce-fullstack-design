import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/signin");
    else fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading orders...</div>;
  if (orders.length === 0) return <div className="text-center py-20">No orders placed yet.</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2 font-semibold">Total: ${order.totalAmount}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>{order.status}</span>
                </div>
                <button className="text-blue-600 text-sm hover:underline" onClick={() => navigate(`/order/${order._id}`)}>View Details →</button>
              </div>
              <div className="mt-3 border-t pt-3">
                <p className="text-sm font-medium">Items:</p>
                <div className="flex gap-3 mt-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-contain" />
                      <span className="text-xs">{item.name} (x{item.quantity})</span>
                    </div>
                  ))}
                  {order.items.length > 3 && <span className="text-xs text-gray-500">+{order.items.length-3} more</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;