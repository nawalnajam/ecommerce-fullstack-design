import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaCommentDots, FaHeart, FaShoppingCart,
  FaBars, FaTimes, FaHome, FaTh, FaGlobe,
  FaHeadset, FaInfoCircle, FaClipboardList,
  FaChevronDown
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // 'lang', 'ship', 'help'
  const [selectedLang, setSelectedLang] = useState({ label: "English", currency: "USD", code: "en" });
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    flagImg: "https://flagcdn.com/w40/de.png",
  });
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isAdmin } = useAuth();
  const headerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const languages = [
    { code: "en", label: "English", currency: "USD" },
    { code: "es", label: "Español", currency: "EUR" },
    { code: "fr", label: "Français", currency: "EUR" },
    { code: "de", label: "Deutsch", currency: "EUR" },
  ];

  const countries = [
    { code: "us", name: "United States", flag: "🇺🇸", flagImg: "https://flagcdn.com/w40/us.png" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧", flagImg: "https://flagcdn.com/w40/gb.png" },
    { code: "de", name: "Germany", flag: "🇩🇪", flagImg: "https://flagcdn.com/w40/de.png" },
    { code: "fr", name: "France", flag: "🇫🇷", flagImg: "https://flagcdn.com/w40/fr.png" },
    { code: "in", name: "India", flag: "🇮🇳", flagImg: "https://flagcdn.com/w40/in.png" },
    { code: "ae", name: "UAE", flag: "🇦🇪", flagImg: "https://flagcdn.com/w40/ae.png" },
  ];

  const helpOptions = [
    { label: "Help Center", link: "/help" },
    { label: "FAQs", link: "/help" },
    { label: "Contact Us", link: "/help" },
    { label: "Returns", link: "/help" },
  ];

  return (
    <div ref={headerRef} className="bg-white border-b sticky top-0 z-30">
      {/* MAIN HEADER */}
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-blue-500 text-white p-2 rounded-lg text-base">👜</div>
          <h1 className="text-2xl font-bold text-blue-600">Brand</h1>
        </Link>

        {/* SEARCH – desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[580px] border-2 border-blue-500 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 outline-none text-sm"
          />
          <select className="border-l px-3 text-sm outline-none bg-gray-50">
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothes</option>
            <option>Home interiors</option>
            <option>Smartphones</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-5 text-sm font-medium hover:bg-blue-700 transition">
            Search
          </button>
        </form>

        {/* ICONS – desktop */}
        <div className="hidden md:flex items-center gap-6 text-gray-600 text-xs">
          <Link to={user ? "/profile" : "/signin"} className="flex flex-col items-center hover:text-blue-600">
            <FaUser size={18} /><span>Profile</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center hover:text-blue-600">
            <FaCommentDots size={18} /><span>Message</span>
          </Link>
          <Link to="/orders" className="flex flex-col items-center hover:text-blue-600">
            <FaHeart size={18} /><span>Orders</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center hover:text-blue-600 relative">
            <div className="relative">
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span>My cart</span>
          </Link>
        </div>

        {/* MOBILE – icons + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} className="text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to={user ? "/profile" : "/signin"}>
            <FaUser size={20} className="text-gray-700" />
          </Link>
          <button className="text-2xl text-gray-700" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </div>

      {/* SEARCH – mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
          <span className="pl-3 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 outline-none text-sm bg-gray-50"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 text-sm">
            Go
          </button>
        </form>
      </div>

      {/* BOTTOM NAV – desktop */}
      <div className="hidden md:block border-t">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center gap-6">
            <Link to="/products" className="flex items-center gap-2 font-medium hover:text-blue-600">
              <FaBars /> All category
            </Link>
            <Link to="/hot-offers" className="hover:text-blue-600">Hot offers</Link>
            <Link to="/gift-boxes" className="hover:text-blue-600">Gift boxes</Link>
            <Link to="/projects" className="hover:text-blue-600">Projects</Link>
            <Link to="/menu-items" className="hover:text-blue-600">Menu item</Link>

            {/* HELP DROPDOWN */}
            <div className="relative">
              <button onClick={() => toggleDropdown("help")} className="flex items-center gap-1 hover:text-blue-600 focus:outline-none">
                Help <FaChevronDown size={10} />
              </button>
              {openDropdown === "help" && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg py-1 z-50 min-w-[140px]">
                  {helpOptions.map((opt, i) => (
                    <Link key={i} to={opt.link} onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {opt.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Dashboard link – only for admin users */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="hover:text-blue-600 font-medium">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT SIDE DROPDOWNS */}
          <div className="flex items-center gap-6 text-gray-600">
            {/* LANGUAGE DROPDOWN */}
            <div className="relative">
              <button onClick={() => toggleDropdown("lang")} className="flex items-center gap-1 hover:text-blue-600 focus:outline-none">
                {selectedLang.label}, {selectedLang.currency} <FaChevronDown size={10} />
              </button>
              {openDropdown === "lang" && (
                <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg py-1 z-50 min-w-[160px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {lang.label} ({lang.currency})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SHIP TO DROPDOWN */}
            <div className="relative">
              <button onClick={() => toggleDropdown("ship")} className="flex items-center gap-2 hover:text-blue-600 focus:outline-none">
                <img src={selectedCountry.flagImg} alt={selectedCountry.code} className="w-5 h-3 object-cover rounded-sm" />
                <span>Ship to: {selectedCountry.name}</span>
                <FaChevronDown size={10} />
              </button>
              {openDropdown === "ship" && (
                <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg py-1 z-50 max-h-60 overflow-y-auto min-w-[200px]">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img src={country.flagImg} alt={country.code} className="w-5 h-3 object-cover rounded-sm" />
                      <span>{country.name}</span>
                      <span className="ml-auto text-xs text-gray-400">{country.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY for mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* SIDE DRAWER – mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-4 right-4 text-gray-400 text-xl" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </button>
        <div className="p-5 border-b bg-gray-50">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <FaUser size={22} className="text-gray-500" />
          </div>
          <p className="text-sm text-gray-700">
            {user ? (
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                {user.name}
              </Link>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                  Sign in
                </Link>
                <span className="mx-1 text-gray-400">|</span>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Main links */}
        <div className="py-3 border-b">
          {[
            { icon: <FaHome />, label: "Home", to: "/" },
            { icon: <FaTh />, label: "Categories", to: "/products" },
            { icon: <FaHeart />, label: "Favorites", to: "/orders" },
            { icon: <FaClipboardList />, label: "My orders", to: "/orders" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span className="text-gray-400">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Nav links */}
        <div className="py-3 border-b">
          {[
            { label: "Hot offers", to: "/hot-offers" },
            { label: "Gift boxes", to: "/gift-boxes" },
            { label: "Projects", to: "/projects" },
            { label: "Menu item", to: "/menu-items" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span>{item.label}</span>
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span>Admin Dashboard</span>
            </Link>
          )}
        </div>

        {/* Secondary links */}
        <div className="py-3 border-b">
          {[
            { icon: <FaGlobe />, label: "English | USD" },
            { icon: <FaHeadset />, label: "Contact us" },
            { icon: <FaInfoCircle />, label: "About" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-400">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="py-3 px-5 flex flex-col gap-3 text-sm text-gray-500">
          <Link to="/help" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
            Help Center
          </Link>
          <span className="cursor-pointer hover:text-blue-600">User agreement</span>
          <span className="cursor-pointer hover:text-blue-600">Partnership</span>
          <span className="cursor-pointer hover:text-blue-600">Privacy policy</span>
        </div>
      </div>
    </div>
  );
};

export default Header;