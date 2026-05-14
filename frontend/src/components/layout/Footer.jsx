import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "About",
    links: ["About Us", "Find store", "Categories", "Blogs"],
  },
  {
    title: "Partnership",
    links: ["About Us", "Find store", "Categories", "Blogs"],
  },
  {
    title: "Information",
    links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
  },
  {
    title: "For users",
    links: ["Login", "Register", "Settings", "My Orders"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-6">
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        {/* Grid: always 1 col on mobile, 2 on small tablets, 6 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-500 text-white p-2 rounded-lg text-base">👜</div>
              <span className="text-xl font-bold text-blue-600">Brand</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              {[
                <FaFacebookF size={11} />,
                <FaTwitter size={11} />,
                <FaLinkedinIn size={11} />,
                <FaInstagram size={11} />,
                <FaYoutube size={11} />,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns (About, Partnership, Information, For users) */}
          {footerLinks.map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-1.5">
                {col.links.map((link, j) => (
                  <li
                    key={j}
                    className="text-xs text-gray-500 cursor-pointer hover:text-blue-600 transition"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get app column */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">Get app</h4>
            <div className="bg-gray-900 text-white rounded-md px-2 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition mb-2 w-full max-w-[120px]">
              <FaApple size={16} />
              <div>
                <p className="text-[8px] text-gray-300 leading-none">Download on the</p>
                <p className="text-[10px] font-semibold leading-tight">App Store</p>
              </div>
            </div>
            <div className="bg-gray-900 text-white rounded-md px-2 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition w-full max-w-[120px]">
              <FaGooglePlay size={14} />
              <div>
                <p className="text-[8px] text-gray-300 leading-none">GET IT ON</p>
                <p className="text-[10px] font-semibold leading-tight">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://flagcdn.com/w40/us.png"
              alt="English"
              className="w-4 h-3 object-cover rounded-sm"
            />
            <span className="text-xs text-gray-600">English ▲</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;