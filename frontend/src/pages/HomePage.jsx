import React, { useState, useEffect } from "react";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const useCountdown = () => {
  const [time, setTime] = useState({ days: 4, hours: 13, mins: 34, secs: 56 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; mins = 0; secs = 0; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
};

const sidebarCategories = [
  "Automobiles", "Clothes and wear", "Home interiors",
  "Computer and tech", "Tools, equipments", "Sports and outdoor",
  "Animal and pets", "Machinery tools", "More category",
];

const mobileCategories = [
  "All category", "Gadgets", "Clothes", "Accessories",
  "Electronics", "Sports", "Home",
];

const dealProducts = [
  { name: "Smart watches", discount: "-25%", img: "/tech/8.jpg" },
  { name: "Laptops",       discount: "-15%", img: "/tech/7.jpg" },
  { name: "GoPro cameras", discount: "-40%", img: "/tech/6.jpg" },
  { name: "Headphones",    discount: "-25%", img: "/tech/9.jpg" },
  { name: "Canon cameras", discount: "-25%", img: "/tech/canon.jpeg" },
];

const homeProducts = [
  { name: "Soft chairs",    price: "USD 19",  img: "/interior/1.jpg" },
  { name: "Sofa & chair",   price: "USD 19",  img: "/interior/2.jpg" },
  { name: "Kitchen dishes", price: "USD 19",  img: "/interior/5.jpg" },
  { name: "Smart watches",  price: "USD 19",  img: "/tech/8.jpg" },
  { name: "Kitchen mixer",  price: "USD 100", img: "/interior/mixer.webp" },
  { name: "Blenders",       price: "USD 39",  img: "/interior/blender.jpeg" },
  { name: "Home appliance", price: "USD 19",  img: "/interior/1.jpg" },
  { name: "Coffee maker",   price: "USD 10",  img: "/interior/cofee.jpeg" },
];

const electronicsProducts = [
  { name: "Smart watches",   price: "USD 19",  img: "/tech/8.jpg" },
  { name: "Cameras",         price: "USD 89",  img: "/tech/canon.jpeg" },
  { name: "Headphones",      price: "USD 10",  img: "/tech/9.jpg" },
  { name: "Smart watches",   price: "USD 90",  img: "/tech/8.jpg" },
  { name: "Gaming set",      price: "USD 35",  img: "/tech/5.jpg" },
  { name: "Laptops & PC",    price: "USD 340", img: "/tech/7.jpg" },
  { name: "Smartphones",     price: "USD 19",  img: "/interior/phones.jpeg" },
  { name: "Electric kattle", price: "USD 240", img: "/interior/electric.jpeg" },
];

const recommendedItems = [
  { name: "T-shirts with multiple colors, for men", price: "$10.30", img: "/cloth/1.jpg" },
  { name: "Jeans shorts for men blue color",        price: "$10.30", img: "/cloth/4.jpg" },
  { name: "Brown winter coat medium size",          price: "$12.50", img: "/cloth/3.jpg" },
  { name: "Jeans bag for travel for men",           price: "$34.00", img: "/cloth/5.jpg" },
  { name: "Leather wallet",                         price: "$99.00", img: "/cloth/6.jpg" },
  { name: "Canon camera",                           price: "$9.99",  img: "/tech/canon.jpeg" },
  { name: "Headset for gaming",                     price: "$8.99",  img: "/tech/5.jpg" },
  { name: "Smartwatch",                             price: "$10.30", img: "/tech/8.jpg" },
  { name: "Blue wallet for men",                    price: "$10.30", img: "/cloth/6.jpg" },
  { name: "Jeans bag for travel",                   price: "$80.95", img: "/cloth/5.jpg" },
];

const services = [
  { title: "Source from Industry Hubs",               icon: "🔍", img: "/cloth/1.png" },
  { title: "Customize Your Products",                 icon: "📦", img: "/cloth/2.png" },
  { title: "Fast, reliable shipping by ocean or air", icon: "✈️", img: "/cloth/3.png" },
  { title: "Product monitoring and inspection",       icon: "🛡️", img: "/cloth/4.png" },
];

const suppliers = [
  { country: "Arabic Emirates", domain: "shopname.ae",     code: "ae" },
  { country: "Australia",       domain: "shopname.ae",     code: "au" },
  { country: "United States",   domain: "shopname.ae",     code: "us" },
  { country: "Russia",          domain: "shopname.ru",     code: "ru" },
  { country: "Italy",           domain: "shopname.it",     code: "it" },
  { country: "Denmark",         domain: "denmark.com.dk",  code: "dk" },
  { country: "France",          domain: "shopname.com.fr", code: "fr" },
  { country: "Arabic Emirates", domain: "shopname.ae",     code: "ae" },
  { country: "China",           domain: "shopname.ae",     code: "cn" },
  { country: "Great Britain",   domain: "shopname.co.uk",  code: "gb" },
];

const HomePage = () => {
  const time = useCountdown();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-[1200px] mx-auto px-4 space-y-4">

        {/* HERO SECTION */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          {/* Mobile categories (horizontal scroll) */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2 mb-3">
            {mobileCategories.map((cat, i) => (
              <span key={i}
                onClick={() => navigate(`/products?category=${cat}`)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs cursor-pointer border ${
                  i === 0
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-3">
            {/* LEFT – desktop categories (hidden on mobile) */}
            <div className="hidden md:block col-span-2 bg-white rounded-lg py-2">
              <ul className="text-sm text-gray-700">
                {sidebarCategories.map((cat, i) => (
                  <li key={i}
                    onClick={() => navigate(`/products?category=${cat}`)}
                    className={`px-4 py-[10px] cursor-pointer rounded-md ${
                      i === 0
                        ? "bg-blue-50 text-gray-900 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* CENTER – Banner (responsive) */}
            <div className="col-span-12 md:col-span-8 rounded-xl overflow-hidden relative h-[200px] md:h-[380px]">
              <div className="absolute inset-0 bg-[#a8d5c2]" />
              <img
                src="/tech/banner1.png"
                alt="Banner"
                className="absolute right-0 top-0 h-full w-full md:w-[72%] object-cover object-left"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-8 z-10">
                <p className="text-gray-700 text-sm md:text-lg mb-1">Latest trending</p>
                <h2 className="text-gray-900 text-xl md:text-3xl font-bold mb-3 md:mb-5">
                  Electronic items
                </h2>
                <button
                  onClick={() => navigate("/products")}
                  className="bg-white text-gray-800 px-4 py-2 rounded-md text-xs md:text-sm font-medium w-fit shadow hover:shadow-md transition"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* RIGHT – desktop cards (hidden on mobile) */}
            <div className="hidden md:flex col-span-2 flex-col gap-3">
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-gray-400" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Hi, user</p>
                    <p className="text-xs text-gray-500">let's get started</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                  Join now
                </button>
                <button className="w-full border border-blue-500 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition">
                  Log in
                </button>
              </div>
              <div className="bg-orange-400 rounded-xl p-4 text-white flex-1 flex items-center">
                <p className="text-sm font-medium leading-relaxed">
                  Get US $10 off<br />with a new<br />supplier
                </p>
              </div>
              <div className="bg-teal-400 rounded-xl p-4 text-white flex-1 flex items-center">
                <p className="text-sm font-medium leading-relaxed">
                  Send quotes with<br />supplier<br />preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DEALS & OFFERS – COUNTDOWN FIXED (now stays in one row on mobile) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-4 border-r flex flex-col justify-center gap-3">
              <div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900">Deals and offers</h3>
                <p className="text-xs text-gray-400 mt-1">Electronic equipments</p>
              </div>
              {/* Countdown timer – inline on mobile, no wrap */}
              <div className="flex gap-2">
                {[
                  { val: String(time.hours).padStart(2,"0"), label: "Hour" },
                  { val: String(time.mins).padStart(2,"0"),  label: "Min"  },
                  { val: String(time.secs).padStart(2,"0"),  label: "Sec"  },
                ].map((t) => (
                  <div key={t.label}
                    className="bg-gray-800 text-white rounded-md px-2 py-1.5 text-center min-w-[55px]"
                  >
                    <p className="text-sm font-bold leading-none">{t.val}</p>
                    <p className="text-[10px] mt-0.5 text-gray-300">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-x-auto md:overflow-visible">
              <div className="flex md:grid md:grid-cols-5 divide-x">
                {dealProducts.map((p, i) => (
                  <div key={i}
                    onClick={() => navigate("/products")}
                    className="flex-shrink-0 w-[140px] md:w-auto flex flex-col items-center justify-between p-3 md:p-5 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img src={p.img} alt={p.name} className="h-20 md:h-28 w-full object-contain" />
                    <p className="text-xs text-gray-700 mt-2 text-center">{p.name}</p>
                    <span className="mt-1 bg-red-100 text-red-500 text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full">
                      {p.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HOME & OUTDOOR */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#f5e6c8] p-5 flex flex-row md:flex-col justify-between items-center md:items-start w-full md:w-1/4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Home and outdoor</h3>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-2 bg-white text-gray-800 px-3 py-1.5 rounded-md text-xs font-medium shadow flex items-center gap-1"
                >
                  Source now <FaArrowRight size={10} />
                </button>
              </div>
              <img src="/interior/home.jpg" alt="Home" className="h-16 md:h-auto md:w-full object-contain mt-0 md:mt-4" />
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x divide-y">
              {homeProducts.slice(0, 8).map((p, i) => (
                <div key={i}
                  onClick={() => navigate("/products")}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-800">{p.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">From</p>
                    <p className="text-xs text-gray-600 font-medium">{p.price}</p>
                  </div>
                  <img src={p.img} alt={p.name} className="h-12 w-12 object-contain flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONSUMER ELECTRONICS */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-blue-50 p-5 flex flex-row md:flex-col justify-between items-center md:items-start w-full md:w-1/4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                  Consumer electronics
                </h3>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-2 bg-white text-gray-800 px-3 py-1.5 rounded-md text-xs font-medium shadow flex items-center gap-1"
                >
                  Source now <FaArrowRight size={10} />
                </button>
              </div>
              <img src="/tech/electronics.jpeg" alt="Electronics" className="h-16 md:h-auto md:w-full object-contain" />
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x divide-y">
              {electronicsProducts.slice(0, 8).map((p, i) => (
                <div key={i}
                  onClick={() => navigate("/products")}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-800">{p.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">From</p>
                    <p className="text-xs text-gray-600 font-medium">{p.price}</p>
                  </div>
                  <img src={p.img} alt={p.name} className="h-12 w-12 object-contain flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEND QUOTE (keep same) */}
        <div className="relative rounded-xl overflow-hidden min-h-[200px] md:min-h-[280px]">
          <img src="/images/warehouse.png" alt="Warehouse" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-500/70 to-teal-400/50" />
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-center">
            <div className="md:col-span-5 text-white">
              <h2 className="text-xl md:text-3xl font-bold leading-snug mb-2 md:mb-4">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-xs md:text-sm text-blue-100 leading-relaxed hidden md:block">Lorem ipsum...</p>
            </div>
            <div className="w-full md:col-span-5 md:col-start-8 bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Send quote to suppliers</h3>
              <input type="text" placeholder="What item you need?" className="w-full border rounded-md px-3 py-2 text-sm mb-2" />
              <textarea placeholder="Type more details" rows={3} className="w-full border rounded-md px-3 py-2 text-sm mb-2 resize-none" />
              <div className="flex gap-2 mb-3">
                <input type="number" placeholder="Quantity" className="flex-1 border rounded-md px-3 py-2 text-sm" />
                <select className="border rounded-md px-3 py-2 text-sm bg-white"><option>Pcs</option><option>Kg</option><option>Box</option></select>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium">Send inquiry</button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED ITEMS */}
        <div className="pb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Recommended items</h2>
            <button onClick={() => navigate("/products")} className="text-sm text-blue-600 hover:underline">See all →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {recommendedItems.map((item, i) => (
              <div key={i} onClick={() => navigate("/products")} className="bg-white rounded-xl p-3 md:p-4 cursor-pointer hover:shadow-md transition border border-gray-100 flex flex-col group">
                <div className="h-32 md:h-44 flex items-center justify-center mb-3 overflow-hidden">
                  <img src={item.img} alt={item.name} className="h-full w-full object-contain group-hover:scale-105 transition" />
                </div>
                <p className="text-sm font-bold text-gray-900">{item.price}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA SERVICES */}
        <div className="pb-2">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Our extra services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer">
                <div className="relative h-28 md:h-36">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 right-3 translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-base">{s.icon}</div>
                </div>
                <div className="p-3 md:p-4 pt-5 md:pt-6">
                  <p className="text-xs md:text-sm font-semibold text-gray-800 leading-snug">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPLIERS BY REGION */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Suppliers by region</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {suppliers.map((s, i) => (
              <div key={i} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <img src={`https://flagcdn.com/w40/${s.code}.png`} alt={s.country} className="w-7 h-5 object-cover rounded-sm" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-800">{s.country}</p>
                  <p className="text-[10px] text-gray-400">{s.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-gray-100 rounded-xl py-8 px-4 text-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-5">Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2.5 w-full max-w-[280px] gap-2">
              <span className="text-gray-400 text-sm">✉</span>
              <input type="email" placeholder="Email" className="outline-none text-sm w-full bg-transparent" />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition">Subscribe</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;