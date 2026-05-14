import React, { useState, useEffect } from "react";
import { FaStar, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import WishlistHeart from "../components/WishlistHeart";
import { getImageUrl } from "../utils/imageUrl";

const occasions = [
  { name: "All",        emoji: "✨", color: "from-gray-400 to-gray-600"   },
  { name: "Birthday",   emoji: "🎂", color: "from-pink-400 to-rose-500"   },
  { name: "Wedding",    emoji: "💍", color: "from-purple-400 to-violet-600"},
  { name: "Corporate",  emoji: "🏢", color: "from-blue-400 to-indigo-600" },
  { name: "Holiday",    emoji: "🎄", color: "from-green-400 to-emerald-600"},
  { name: "Baby",       emoji: "👶", color: "from-yellow-400 to-orange-400"},
  { name: "Anniversary",emoji: "❤️", color: "from-red-400 to-rose-600"    },
];

const bundles = [
  { name: "Luxury Tech Bundle",   items: "5 items", price: "$299",  saving: "Save $80",  img: "/tech/7.jpg",     badge: "🔥 Best Seller", color: "from-slate-800 to-slate-900" },
  { name: "Fashion Gift Set",     items: "4 items", price: "$149",  saving: "Save $40",  img: "/cloth/3.jpg",    badge: "💎 Premium",     color: "from-purple-800 to-purple-900" },
  { name: "Home Comfort Pack",    items: "6 items", price: "$199",  saving: "Save $60",  img: "/interior/1.jpg", badge: "⭐ Popular",      color: "from-amber-700 to-amber-900" },
  { name: "Gadget Lover Kit",     items: "3 items", price: "$249",  saving: "Save $50",  img: "/tech/5.jpg",     badge: "🆕 New",          color: "from-blue-800 to-blue-900" },
];

const GiftBoxesPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [occasion, setOccasion] = useState("All");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleAdd = async (e, id) => {
    e.stopPropagation();
    await addToCart(id, 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="bg-[#fdf6f0] min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 py-16 px-4">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-7 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">🎁 <span>Special Gift Collections</span></div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Give the Gift<br />of <span className="text-yellow-300">Happiness</span></h1>
              <p className="text-rose-100 text-lg mb-8 max-w-md">Curated gift boxes for every occasion. Free wrapping & personal messages included.</p>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => navigate("/products")} className="bg-white text-rose-500 px-8 py-3 rounded-full font-bold hover:shadow-xl transition flex items-center gap-2">Shop Now <FaArrowRight size={14} /></button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">View Bundles</button>
              </div>
              <div className="flex gap-8 mt-10">
                {[["500+", "Gift Options"], ["Free", "Gift Wrap"], ["24hr", "Delivery"]].map(([val, label]) => (
                  <div key={label}><p className="text-2xl font-black text-yellow-300">{val}</p><p className="text-rose-100 text-sm">{label}</p></div>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {["/tech/8.jpg", "/cloth/3.jpg", "/interior/1.jpg", "/tech/5.jpg"].map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden shadow-2xl ${i === 1 ? "mt-6" : ""} ${i === 3 ? "-mt-6" : ""}`}>
                    <img src={getImageUrl(img)} alt="Gift" className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-10 space-y-12">
        {/* Occasion filter */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Shop by Occasion</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {occasions.map((occ) => (
              <button key={occ.name} onClick={() => setOccasion(occ.name)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition font-semibold text-sm ${
                  occasion === occ.name ? `bg-gradient-to-br ${occ.color} text-white shadow-lg scale-105` : "bg-white text-gray-600 hover:shadow-md border border-gray-100"
                }`}>
                <span className="text-2xl">{occ.emoji}</span><span>{occ.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Curated Bundles */}
        <div>
          <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-black text-gray-900">Curated Gift Bundles</h2><span className="text-sm text-rose-500 font-semibold">Exclusive Sets</span></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bundles.map((bundle, i) => (
              <div key={i} className={`relative bg-gradient-to-br ${bundle.color} rounded-2xl p-5 text-white overflow-hidden cursor-pointer group hover:shadow-2xl transition hover:-translate-y-1`}>
                <div className="absolute top-3 right-3 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">{bundle.badge}</div>
                <div className="h-28 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-white/10">
                  <img src={getImageUrl(bundle.img)} alt={bundle.name} className="h-full w-full object-contain p-2 group-hover:scale-110 transition duration-300" />
                </div>
                <p className="font-bold text-sm mb-1">{bundle.name}</p>
                <p className="text-white/60 text-xs mb-3">{bundle.items}</p>
                <div className="flex items-center justify-between">
                  <div><p className="text-xl font-black">{bundle.price}</p><p className="text-green-300 text-xs">{bundle.saving}</p></div>
                  <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"><FaArrowRight size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-black text-gray-900">Perfect Gifts<span className="text-rose-500 ml-2">({products.length})</span></h2><button onClick={() => navigate("/products")} className="text-sm text-rose-500 font-semibold hover:underline flex items-center gap-1">See all <FaArrowRight size={10} /></button></div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse"><div className="h-40 bg-gray-100 rounded-xl mb-3" /><div className="h-4 bg-gray-100 rounded w-3/4 mb-2" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((p) => (
                <div key={p._id} onClick={() => navigate(`/product/${p._id}`)} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition cursor-pointer group border border-transparent hover:border-rose-100 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-rose-50 text-rose-500 text-xs font-bold px-2 py-0.5 rounded-full">🎁 Giftable</span>
                    <WishlistHeart productId={p._id} size={14} />
                  </div>
                  <div className="h-36 flex items-center justify-center mb-3 overflow-hidden rounded-xl bg-gray-50">
                    <img src={getImageUrl(p.image)} alt={p.name} className="h-full w-full object-contain p-2 group-hover:scale-110 transition duration-300" />
                  </div>
                  <p className="text-xs text-rose-400 font-semibold mb-1">{p.category}</p>
                  <p className="text-sm font-bold text-gray-800 line-clamp-2 mb-2">{p.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (<FaStar key={j} size={10} className={j < p.rating ? "text-yellow-400" : "text-gray-200"} />))}
                    <span className="text-[10px] text-gray-400 ml-1">{p.reviews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-gray-900">${p.price}</p>
                    <button onClick={(e) => handleAdd(e, p._id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${addedId === p._id ? "bg-green-500 text-white" : "bg-rose-500 text-white hover:bg-rose-600"}`}>
                      <FaShoppingCart size={10} /> {addedId === p._id ? "Added!" : "Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Perks section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: "🎀", title: "Free Gift Wrap", desc: "On all orders $50+" },
            { emoji: "✍️", title: "Personal Message", desc: "Custom note included" },
            { emoji: "🚀", title: "Same Day Delivery", desc: "Order before 2PM" },
            { emoji: "↩️", title: "Easy Returns", desc: "30-day hassle free" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
              <p className="text-4xl mb-3">{item.emoji}</p>
              <p className="font-bold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftBoxesPage;