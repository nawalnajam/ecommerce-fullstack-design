import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-blue-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mt-1">{product.category}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}