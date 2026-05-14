import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // ✅ Page load pe purane messages clear karo
  useEffect(() => {
    localStorage.removeItem("authMessage");
    setSuccessMsg("");
    setError("");
  }, []);

  // ✅ Success message handle and redirect
  useEffect(() => {
    const msg = localStorage.getItem("authMessage");
    if (msg && !loading) {
      setSuccessMsg(msg);
      localStorage.removeItem("authMessage");
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await signup(name, email, password);
      if (result === false) {
        // error already set in context
        setError("Signup failed. Try again.");
      }
      // success will be handled by useEffect
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
            👜
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join us for exclusive deals</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
            ❌ {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">
            ✅ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-400"
              placeholder="John Doe"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-400"
              placeholder="john@example.com"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-400"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;