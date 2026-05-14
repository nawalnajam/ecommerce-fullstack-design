import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing
      ? `http://localhost:5000/api/admin/products/${editing}`
      : "http://localhost:5000/api/admin/products";
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert(editing ? "Product updated" : "Product created");
        fetchProducts();
        setEditing(null);
        setFormData({ name: "", price: "", image: "", description: "", category: "", stock: "", rating: 0, reviews: 0 });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Product deleted");
        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel - Manage Products</h1>

        {/* Product form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editing ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border rounded-lg px-3 py-2" />
            <input type="number" placeholder="Price" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="border rounded-lg px-3 py-2" />
            <input type="text" placeholder="Image URL" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="border rounded-lg px-3 py-2" />
            <input type="text" placeholder="Description" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border rounded-lg px-3 py-2" />
            <input type="text" placeholder="Category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border rounded-lg px-3 py-2" />
            <input type="number" placeholder="Stock" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="border rounded-lg px-3 py-2" />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {editing ? "Update Product" : "Create Product"}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setFormData({ name: "", price: "", image: "", description: "", category: "", stock: "", rating: 0, reviews: 0 }); }} className="bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition">
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Products list */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Image</th>
                  <th className="px-4 py-3 text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-sm font-semibold">Stock</th>
                  <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3"><img src={p.image} alt={p.name} className="w-12 h-12 object-contain" /></td>
                    <td className="px-4 py-3 text-sm">{p.name}</td>
                    <td className="px-4 py-3 text-sm">${p.price}</td>
                    <td className="px-4 py-3 text-sm">{p.category}</td>
                    <td className="px-4 py-3 text-sm">{p.stock}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 mr-3 text-sm">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;