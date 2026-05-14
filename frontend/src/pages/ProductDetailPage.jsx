import React, { useState, useEffect } from "react";
import {
  FaStar, FaHeart, FaShieldAlt, FaTruck,
  FaUndo, FaChevronRight, FaShoppingCart,
  FaMinus, FaPlus, FaEnvelope, FaCheckCircle,
  FaMapMarkerAlt
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageUrl";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mainImg, setMainImg] = useState("");
  const [saved, setSaved] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          setMainImg(getImageUrl(data.product.image));
        }

        const resAll = await fetch("http://localhost:5000/api/products");
        const dataAll = await resAll.json();
        if (dataAll.success) {
          setSimilarProducts(dataAll.products.filter(p => p._id !== id).slice(0, 10));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product._id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold">Product not found</p>
          <button onClick={() => navigate("/products")} className="mt-4 text-blue-600">
            ← Back to products
          </button>
        </div>
      </div>
    );

  const price = product.price || 99.5;
  const bulkPrice = price * 0.8; // example

  // Limit description length for "Read more"
  const shortDesc = product.description?.slice(0, 150) || "";
  const fullDesc = product.description || "";
  const descToShow = readMore ? fullDesc : shortDesc;

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb (simple on mobile) */}
        <div className="flex items-center gap-1 text-xs text-gray-500 py-3">
          <span onClick={() => navigate("/")} className="cursor-pointer">Home</span>
          <FaChevronRight size={8} />
          <span onClick={() => navigate("/products")} className="cursor-pointer">
            {product.category || "Products"}
          </span>
          <FaChevronRight size={8} />
          <span className="text-gray-700 line-clamp-1">{product.name}</span>
        </div>

        {/* Main product card – responsive: column on mobile, row on desktop */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image section */}
            <div className="md:w-1/2 p-4">
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-center h-64 md:h-80 bg-gray-50">
                <img src={mainImg} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {[product.image, "/tech/1.jpg", "/tech/2.jpg", "/tech/3.jpg"].map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImg(getImageUrl(img))}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 ${
                      mainImg === getImageUrl(img) ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className="md:w-1/2 p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">(50-100 pcs)</span>
              </div>

              {/* Send inquiry button (prominent on mobile) */}
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium mb-4 flex items-center justify-center gap-2">
                <FaEnvelope /> Send inquiry
              </button>

              {/* Specs as two columns on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
                <div className="flex"><span className="text-gray-500 w-28">Condition</span><span className="text-gray-800">Brand new</span></div>
                <div className="flex"><span className="text-gray-500 w-28">Material</span><span className="text-gray-800">Plastic, Metal</span></div>
                <div className="flex"><span className="text-gray-500 w-28">Category</span><span className="text-gray-800">{product.category || "Electronics, gadgets"}</span></div>
                <div className="flex"><span className="text-gray-500 w-28">Item num</span><span className="text-gray-800">{product._id?.slice(-6) || "23421"}</span></div>
              </div>

              {/* Description with Read more toggle */}
              <div className="text-sm text-gray-600 mb-4">
                <p>{descToShow}</p>
                {fullDesc.length > 150 && (
                  <button onClick={() => setReadMore(!readMore)} className="text-blue-600 mt-1 text-sm font-medium">
                    {readMore ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Supplier info card */}
              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">ST</div>
                <div>
                  <p className="font-semibold">Supplier Trading LLC</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt size={10}/> Germany</span>
                    <span className="flex items-center gap-1 text-green-600"><FaCheckCircle size={10}/> Verified</span>
                    <span className="flex items-center gap-1"><FaTruck size={10}/> Shipping</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to cart (optional) – but the mobile screenshot doesn't show it; we keep for completeness */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center border rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-lg">-</button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-lg">+</button>
                </div>
                <button onClick={handleAddToCart} className={`flex-1 py-2 rounded-lg font-medium ${added ? "bg-green-500" : "bg-blue-600"} text-white`}>
                  {added ? "✓ Added" : "Add to Cart"}
                </button>
                <button onClick={() => setSaved(!saved)} className={`p-2 rounded-full border ${saved ? "border-red-300 text-red-500" : "border-gray-300 text-gray-500"}`}>
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar products – horizontal scroll on mobile, grid on desktop */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Similar products</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
              {similarProducts.map(p => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="flex-shrink-0 w-40 md:w-auto bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition"
                >
                  <div className="h-32 flex items-center justify-center mb-2">
                    <img src={getImageUrl(p.image)} alt={p.name} className="h-full w-full object-contain" />
                  </div>
                  <p className="text-xs font-semibold line-clamp-2">{p.name}</p>
                  <p className="text-sm font-bold text-blue-600 mt-1">${p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;