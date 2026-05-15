import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import MessagesPage from "./pages/MessagesPage";
import HotOffersPage from "./pages/HotOffersPage";
import GiftBoxesPage from "./pages/GiftBoxesPage";
import ProjectsPage from "./pages/ProjectsPage";
import MenuItemsPage from "./pages/MenuItemsPage";
import HelpPage from "./pages/HelpPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/hot-offers" element={<HotOffersPage />} />
            <Route path="/gift-boxes" element={<GiftBoxesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/menu-items" element={<MenuItemsPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;