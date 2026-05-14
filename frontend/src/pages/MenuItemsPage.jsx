import React, { useState, useEffect } from "react";
import { FaStar, FaFire, FaBolt, FaCrown, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

const menuTabs = [
  { id: "featured", label: "Featured", icon: <FaStar />, color: "bg-amber-500" },
  { id: "new", label: "New Arrivals", icon: <FaBolt />, color: "bg-blue-500" },
  { id: "sale", label: "On Sale", icon: <FaFire />, color: "bg-red-500" },
  { id: "top", label: "Top Rated", icon: <FaCrown />, color: "bg-purple-500" },
  { id: "trending", label: "Trending", icon: <FaChartLine />, color: "bg-green-500" },
];

const MenuItemsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("featured");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchAndFilter = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.success) {
          let filtered = [...data.products];
          if (activeTab === "top") filtered.sort((a, b) => b.rating - a.rating);
          if (activeTab === "sale") filtered = filtered.filter((_, idx) => idx % 2 === 0);
          if (activeTab === "new") filtered = filtered.reverse();
          if (activeTab === "trending") filtered = filtered.filter((_, idx) => idx % 3 !== 0);
          setProducts(filtered);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAndFilter();
  }, [activeTab]);

  const handleAdd = async (e, id) => {
    e.stopPropagation();
    await addToCart(id, 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h1 className="text-2xl font-bold">Menu Items</h1><p className="text-gray-500">Choose a category</p></div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {menuTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab.id ? `${tab.color} text-white shadow-md` : "bg-white text-gray-600 hover:bg-gray-100"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} className="bg-white rounded-xl p-4 shadow hover:shadow-lg cursor-pointer">
                <img src={getImageUrl(p.image)} alt={p.name} className="h-32 w-full object-contain mb-2" />
                <p className="font-semibold text-sm line-clamp-1">{p.name}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={10} className={i < p.rating ? "text-yellow-400" : "text-gray-200"} />)}
                </div>
                <p className="text-lg font-bold text-gray-800">${p.price}</p>
                <button onClick={(e) => handleAdd(e, p._id)} className="mt-2 w-full bg-blue-600 text-white py-1 rounded-lg text-sm hover:bg-blue-700 transition">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemsPage;