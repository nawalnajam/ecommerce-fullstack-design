import React, { useState, useEffect } from "react";
import { FaStar, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WishlistHeart from "../components/WishlistHeart";
import { getImageUrl } from "../utils/imageUrl";

const HotOffersPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 mb-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><FaFire size={20} /><span className="text-sm font-medium">Limited Time Offers</span></div>
            <h1 className="text-3xl font-bold mb-2">Hot Offers 🔥</h1>
            <p className="text-orange-100">Amazing deals up to 50% off on selected items</p>
          </div>
          <div className="text-right"><p className="text-sm text-orange-100">Ends in</p><p className="text-3xl font-bold">23:59:00</p></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer group border border-transparent hover:border-orange-200 relative">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">-{Math.floor(Math.random() * 30 + 10)}%</span>
                <div onClick={(e) => e.stopPropagation()}><WishlistHeart productId={p._id} size={14} /></div>
              </div>
              <div className="h-36 flex items-center justify-center mb-3">
                <img src={getImageUrl(p.image)} alt={p.name} className="h-full w-full object-contain" />
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">{p.name}</p>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (<FaStar key={j} size={10} className={j < p.rating ? "text-yellow-400" : "text-gray-200"} />))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900">${p.price}</span>
                <span className="text-xs text-gray-400 line-through">${(p.price * 1.3).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotOffersPage;