import React, { useState, useEffect } from "react";
import { FaTh, FaThList, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

const categories = [
  { name: "All", emoji: "🌐" },
  { name: "Electronics", emoji: "💻" },
  { name: "Smartphones", emoji: "📱" },
  { name: "Clothes", emoji: "👗" },
  { name: "Home interiors", emoji: "🏠" },
  { name: "Sports", emoji: "⚽" },
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:5000/api/products";
        if (activeTab !== "All") url += `?category=${encodeURIComponent(activeTab)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          let sorted = [...data.products];
          if (sortBy === "low") sorted.sort((a, b) => a.price - b.price);
          if (sortBy === "high") sorted.sort((a, b) => b.price - a.price);
          if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
          setProducts(sorted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab, sortBy]);

  const handleAdd = async (e, id) => {
    e.stopPropagation();
    await addToCart(id, 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white mb-6">
            <div className="h-8 bg-white/20 rounded w-64 animate-pulse mb-2" />
            <div className="h-5 bg-white/20 rounded w-48 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow animate-pulse">
                <div className="h-36 bg-gray-100 rounded-lg mb-3" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-5 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white mb-6">
          <h1 className="text-3xl font-bold">Projects & Collections</h1>
          <p className="text-blue-100 mt-2">Browse by category</p>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeTab === cat.name
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-3 flex flex-wrap justify-between items-center gap-3 mb-6">
          <span className="text-sm text-gray-500">{products.length} items</span>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded ${viewMode === "grid" ? "text-blue-600" : "text-gray-400"}`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${viewMode === "list" ? "text-blue-600" : "text-gray-400"}`}
            >
              <FaThList />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer"
              >
                <img src={getImageUrl(p.image)} alt={p.name} className="h-36 w-full object-contain mb-2" />
                <p className="font-semibold line-clamp-1">{p.name}</p>
                <p className="text-blue-600 text-lg font-bold">${p.price}</p>
                <button
                  onClick={(e) => handleAdd(e, p._id)}
                  className={`mt-2 w-full px-3 py-1 rounded-lg text-sm transition ${
                    addedId === p._id ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {addedId === p._id ? "Added!" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer flex gap-4 items-center"
              >
                <img src={getImageUrl(p.image)} alt={p.name} className="w-24 h-24 object-contain" />
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                  <p className="text-blue-600 font-bold">${p.price}</p>
                </div>
                <button
                  onClick={(e) => handleAdd(e, p._id)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition ${
                    addedId === p._id ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {addedId === p._id ? "Added!" : "Add"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;