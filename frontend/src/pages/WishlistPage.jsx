import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import WishlistHeart from "../components/WishlistHeart";

const WishlistPage = () => {
  const { wishlist, loading } = useWishlist();
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-1200px mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">No items in wishlist</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlist.map(item => (
              <div key={item.productId?._id} className="bg-white rounded-xl p-3 shadow relative group">
                <WishlistHeart productId={item.productId?._id} size={18} className="absolute top-2 right-2 z-10" />
                <img src={item.productId?.image} alt={item.productId?.name} className="h-32 w-full object-contain mb-2" />
                <p className="font-semibold text-sm line-clamp-1">{item.productId?.name}</p>
                <p className="text-blue-600 font-bold">${item.productId?.price}</p>
                <button onClick={() => navigate(`/product/${item.productId?._id}`)} className="mt-2 text-sm text-blue-600">View</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;