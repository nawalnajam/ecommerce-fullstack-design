import React, { useState, useEffect } from "react";
import { FaStar, FaThList, FaTh, FaChevronRight, FaTimes, FaChevronDown, FaFilter } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchProducts } from "../services/api";
import WishlistHeart from "../components/WishlistHeart";
import { getImageUrl } from "../utils/imageUrl";

const SidebarSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b pb-3 mb-3">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-2">
        {title}
        <FaChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [condition, setCondition] = useState("any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeTags, setActiveTags] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState("Mobile accessory");

  const mobileCategories = ["Tablets", "Phones", "Ipads", "Ipod"];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("search") || "";
    const c = params.get("category") || "";
    setSearch(s);
    setCategory(c);
    if (c) setActiveTags([c]);
  }, [location.search]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(search, category);
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, category]);

  const removeTag = (tag) => {
    setActiveTags(activeTags.filter(t => t !== tag));
    setCategory("");
    setSearch("");
  };

  const applyPriceFilter = () => {
    const filtered = products.filter(p => {
      const min = priceMin ? p.price >= Number(priceMin) : true;
      const max = priceMax ? p.price <= Number(priceMax) : true;
      return min && max;
    });
    setProducts(filtered);
  };

  const FilterDrawer = () => (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={() => setFilterDrawerOpen(false)} />
      <div className="relative ml-auto w-[80%] max-w-sm h-full bg-white shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="font-bold">Filters</h2>
          <button onClick={() => setFilterDrawerOpen(false)}><FaTimes /></button>
        </div>
        <div className="p-4 space-y-5">
          <SidebarSection title="Category">
            {["Electronics", "Smartphones", "Clothes", "Home interiors", "Sports", "Automobiles"].map(c => (
              <p key={c} onClick={() => { setCategory(c); setActiveTags([c]); setFilterDrawerOpen(false); navigate(`/products?category=${c}`); }}
                className={`text-sm py-1.5 cursor-pointer ${category === c ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                {c}
              </p>
            ))}
            <p className="text-xs text-blue-600 cursor-pointer mt-1" onClick={() => { setCategory(""); navigate("/products"); setFilterDrawerOpen(false); }}>
              Clear category
            </p>
          </SidebarSection>
          <SidebarSection title="Brands">
            {["Samsung","Apple","Huawei","Poco","Lenovo"].map(b => <label key={b} className="flex items-center gap-2 text-sm py-1"><input type="checkbox" className="accent-blue-600" /> {b}</label>)}
          </SidebarSection>
          <SidebarSection title="Features">
            {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map(f => <label key={f} className="flex items-center gap-2 text-sm py-1"><input type="checkbox" className="accent-blue-600" /> {f}</label>)}
          </SidebarSection>
          <SidebarSection title="Price range">
            <div className="flex gap-2 mb-2">
              <input type="number" placeholder="Min" value={priceMin} onChange={(e)=>setPriceMin(e.target.value)} className="w-full border rounded-md px-2 py-1.5 text-sm" />
              <input type="number" placeholder="Max" value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} className="w-full border rounded-md px-2 py-1.5 text-sm" />
            </div>
            <button onClick={() => { applyPriceFilter(); setFilterDrawerOpen(false); }} className="w-full bg-blue-600 text-white py-1.5 rounded-md">Apply</button>
          </SidebarSection>
          <SidebarSection title="Condition">
            {["any","refurbished","brand new","old items"].map(c => <label key={c} className="flex items-center gap-2 text-sm py-1"><input type="radio" name="cond" checked={condition===c} onChange={()=>setCondition(c)} /> {c}</label>)}
          </SidebarSection>
          <SidebarSection title="Ratings">
            {[5,4,3,2].map(r => <label key={r} className="flex items-center gap-2 py-1"><input type="radio" name="rating" /> <div className="flex gap-0.5">{Array.from({length:5}).map((_,j)=><FaStar key={j} size={12} className={j<r?"text-yellow-400":"text-gray-200"}/>)}</div></label>)}
          </SidebarSection>
        </div>
      </div>
    </div>
  );

  const displayedProducts = verifiedOnly ? products.filter(p => p.rating > 4) : products;
  const alsoLike = products.slice(0, 8); // just example

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/")}>Home</span>
          <FaChevronRight size={8} />
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/products")}>Clothing</span>
          <FaChevronRight size={8} />
          <span className="text-gray-700">{category || "Mobile accessory"}</span>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Desktop Sidebar (hidden on mobile) */}
          <div className="hidden md:block col-span-3 bg-white rounded-xl p-4 shadow-sm h-fit">
            {/* same desktop sidebar code as before - keep your existing */}
            <SidebarSection title="Category">
              {["Mobile accessory", "Electronics", "Smartphones", "Modern tech"].map(c => <p key={c} onClick={()=>{setCategory(c); setActiveTags([c]); navigate(`/products?category=${c}`);}} className="text-sm py-1.5 cursor-pointer">{c}</p>)}
              <p className="text-xs text-blue-600 cursor-pointer mt-1">See all</p>
            </SidebarSection>
            <SidebarSection title="Brands">
              {["Samsung","Apple","Huawei","Poco","Lenovo"].map(b => <label key={b} className="flex items-center gap-2 text-sm py-1"><input type="checkbox" /> {b}</label>)}
            </SidebarSection>
            <SidebarSection title="Price range">
              <div className="flex gap-2 mb-2"><input type="number" placeholder="Min" value={priceMin} onChange={e=>setPriceMin(e.target.value)} className="w-full border rounded-md px-2 py-1"/><input type="number" placeholder="Max" value={priceMax} onChange={e=>setPriceMax(e.target.value)} className="w-full border rounded-md px-2 py-1"/></div>
              <button onClick={applyPriceFilter} className="w-full border border-blue-500 text-blue-600 py-1 rounded-md">Apply</button>
            </SidebarSection>
            <SidebarSection title="Condition">
              {["any","refurbished","brand new","old items"].map(c => <label key={c} className="flex items-center gap-2 text-sm"><input type="radio" name="condDesktop" checked={condition===c} onChange={()=>setCondition(c)} /> {c}</label>)}
            </SidebarSection>
            <SidebarSection title="Ratings">
              {[5,4,3,2].map(r => <label key={r} className="flex items-center gap-2"><input type="radio" name="ratingDesktop" /> <div className="flex gap-0.5">{Array.from({length:5}).map((_,j)=><FaStar key={j} size={12} className={j<r?"text-yellow-400":"text-gray-200"}/>)}</div></label>)}
            </SidebarSection>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9 space-y-3">
            {/* Top bar – for mobile: category tabs + filter button */}
            <div>
              {/* Mobile category tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2 md:hidden">
                {mobileCategories.map(tab => (
                  <button key={tab} onClick={() => { setActiveMobileTab(tab); setCategory(tab === "Mobile accessory" ? "" : tab); navigate(`/products${tab !== "Mobile accessory" ? `?category=${tab}` : ""}`); }}
                    className={`flex-shrink-0 text-sm whitespace-nowrap px-3 py-1 rounded-full border ${activeMobileTab === tab ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              {/* Sort and filter row */}
              <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Sort: Newest</span>
                  <button onClick={() => setFilterDrawerOpen(true)} className="flex items-center gap-1 ml-2">
                    <FaFilter size={12} /> Filter (3)
                  </button>
                </div>
                {/* Grid/list toggle hidden on mobile? Actually keep but small */}
                <div className="flex gap-1">
                  <button onClick={()=>setViewMode("list")} className={`p-1 ${viewMode==="list"?"text-blue-600":"text-gray-400"}`}><FaThList size={14}/></button>
                  <button onClick={()=>setViewMode("grid")} className={`p-1 ${viewMode==="grid"?"text-blue-600":"text-gray-400"}`}><FaTh size={14}/></button>
                </div>
              </div>
            </div>

            {/* Desktop top bar (different layout) */}
            <div className="hidden md:flex bg-white rounded-xl px-4 py-3 shadow-sm justify-between items-center">
              <p className="text-sm"><span className="font-semibold">{displayedProducts.length}</span> items in {category || "Mobile accessory"}</p>
              <div className="flex gap-3"><label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={verifiedOnly} onChange={e=>setVerifiedOnly(e.target.checked)} className="accent-blue-600" /> Verified only</label><select className="border rounded-md px-2 py-1 text-sm"><option>Featured</option></select><div className="flex gap-1"><button onClick={()=>setViewMode("list")} className={`p-1 ${viewMode==="list"?"text-blue-600":"text-gray-400"}`}><FaThList size={15}/></button><button onClick={()=>setViewMode("grid")} className={`p-1 ${viewMode==="grid"?"text-blue-600":"text-gray-400"}`}><FaTh size={15}/></button></div></div>
            </div>

            {/* Active tags */}
            {activeTags.length>0 && <div className="bg-white rounded-xl px-3 py-2 flex flex-wrap gap-2 text-xs">{activeTags.map(t=><span key={t} className="border rounded-full px-2 py-0.5 flex items-center gap-1">{t}<FaTimes size={8} className="cursor-pointer" onClick={()=>removeTag(t)}/></span>)}<button onClick={()=>{setActiveTags([]);setCategory("");navigate("/products");}} className="text-blue-600">Clear all</button></div>}

            {/* Loading skeleton */}
            {loading && <div className="space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="bg-white rounded-xl p-3 flex gap-3 animate-pulse"><div className="w-20 h-20 bg-gray-100 rounded"/><div className="flex-1"><div className="h-4 bg-gray-100 w-3/4 mb-2"/><div className="h-3 bg-gray-100 w-1/2"/></div></div>)}</div>}

            {/* No results */}
            {!loading && displayedProducts.length===0 && <div className="bg-white rounded-xl p-8 text-center">No products</div>}

            {/* Product List – MOBILE uses single column list (as in screenshot), DESKTOP uses list view or grid */}
            {!loading && viewMode==="list" && displayedProducts.length>0 && (
              <div className="space-y-3">
                {displayedProducts.map(p=>(
                  <div key={p._id} onClick={()=>navigate(`/product/${p._id}`)} className="bg-white rounded-xl p-3 shadow-sm cursor-pointer flex gap-3">
                    <img src={getImageUrl(p.image)} alt={p.name} className="w-24 h-24 object-contain rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-blue-600 font-bold text-lg">${p.price}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({length:5}).map((_,j)=><FaStar key={j} size={10} className={j<p.rating?"text-yellow-400":"text-gray-200"}/>)}
                        <span className="text-xs text-gray-500 ml-1">{p.rating} | {p.reviews} orders</span>
                      </div>
                      <p className="text-xs text-green-500 mt-1">Free Shipping</p>
                    </div>
                    <WishlistHeart productId={p._id} size={16} />
                  </div>
                ))}
              </div>
            )}

            {/* Grid view (for desktop only, if user toggles) */}
            {!loading && viewMode==="grid" && displayedProducts.length>0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {displayedProducts.map(p=>(
                  <div key={p._id} onClick={()=>navigate(`/product/${p._id}`)} className="bg-white rounded-xl p-3 shadow-sm cursor-pointer">
                    <img src={getImageUrl(p.image)} alt={p.name} className="h-32 w-full object-contain mb-2" />
                    <p className="font-bold">${p.price}</p>
                    <div className="flex items-center gap-0.5">{Array.from({length:5}).map((_,j)=><FaStar key={j} size={10} className={j<p.rating?"text-yellow-400":"text-gray-200"}/>)}</div>
                    <p className="text-xs line-clamp-2">{p.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* You may also like section – horizontal scroll on mobile */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800">You may also like</h3>
                <button className="text-sm text-blue-600">See all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {alsoLike.slice(0,6).map(item=>(
                  <div key={item._id} onClick={()=>navigate(`/product/${item._id}`)} className="flex-shrink-0 w-32 bg-white rounded-xl p-2 shadow-sm cursor-pointer">
                    <img src={getImageUrl(item.image)} alt={item.name} className="h-24 w-full object-contain" />
                    <p className="text-xs font-semibold mt-1 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination – simplified for mobile */}
            <div className="bg-white rounded-xl px-3 py-2 flex justify-between items-center text-sm">
              <span>Showing {displayedProducts.length} products</span>
              <div className="flex gap-1"><button className="px-2 py-1 border rounded">‹</button><button className="px-2 py-1 bg-blue-600 text-white rounded">1</button><button className="px-2 py-1 border rounded">›</button></div>
            </div>
          </div>
        </div>
      </div>
      {filterDrawerOpen && <FilterDrawer />}
    </div>
  );
};

export default ProductsPage;