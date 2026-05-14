import React, { useState } from "react";
import { FaChevronDown, FaHeadset, FaEnvelope,
         FaPhone, FaSearch, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const faqCategories = ["All", "Orders", "Shipping", "Returns", "Payment", "Account"];

const faqs = [
  { q: "How do I track my order?",           a: "Go to My Orders page and click on your order to see real-time tracking details and estimated delivery date.",                    cat: "Orders"   },
  { q: "What is the return policy?",         a: "We offer 30-day hassle-free returns on all items. Items must be in original condition. Contact support to initiate a return.",  cat: "Returns"  },
  { q: "How do I contact a supplier?",       a: "Click 'Send Inquiry' on any product page to directly message the supplier. You'll receive a response within 24 hours.",        cat: "Orders"   },
  { q: "Is my payment information secure?",  a: "Yes, all payments are encrypted using SSL technology. We support Visa, Mastercard, PayPal, and Apple Pay.",                    cat: "Payment"  },
  { q: "How long does shipping take?",       a: "Standard shipping: 5-7 business days. Express: 2-3 days. Overnight available for select locations.",                          cat: "Shipping" },
  { q: "Can I cancel my order?",             a: "Orders can be cancelled within 24 hours of placement. After that, please wait for delivery and initiate a return.",           cat: "Orders"   },
  { q: "How do I change my password?",       a: "Go to Profile → Settings → Change Password. You'll receive a verification email to confirm the change.",                      cat: "Account"  },
  { q: "Do you offer wholesale pricing?",    a: "Yes! For bulk orders of 50+ items, contact our sales team for special wholesale pricing and terms.",                           cat: "Payment"  },
  { q: "What if my package is damaged?",     a: "Take photos and contact us within 48 hours of delivery. We'll arrange a replacement or full refund immediately.",             cat: "Shipping" },
  { q: "How do I become a verified seller?", a: "Submit your business documents through our Seller Portal. Verification takes 3-5 business days.",                             cat: "Account"  },
];

const HelpPage = () => {
  const navigate  = useNavigate();
  const [openFaq,     setOpenFaq]     = useState(null);
  const [activeFilter,setActiveFilter]= useState("All");
  const [search,      setSearch]      = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [formData,    setFormData]    = useState({ name: "", email: "", subject: "", message: "" });

  const filteredFaqs = faqs.filter(faq => {
    const matchCat    = activeFilter === "All" || faq.cat === activeFilter;
    const matchSearch = faq.q.toLowerCase().includes(search.toLowerCase()) ||
                        faq.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-[900px] mx-auto px-4 space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeadset size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">How can we help you?</h1>
          <p className="text-blue-100 mb-6">
            Find answers to common questions or contact our support team
          </p>

          {/* Search */}
          <div className="flex max-w-lg mx-auto overflow-hidden rounded-xl shadow-lg">
            <div className="flex items-center bg-white flex-1 px-4 gap-3">
              <FaSearch className="text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search for help..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-3 outline-none text-gray-700 text-sm"
              />
            </div>
            <button className="bg-orange-400 text-white px-6 text-sm font-semibold hover:bg-orange-500 transition">
              Search
            </button>
          </div>
        </div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon:  <FaHeadset size={28} />,
              title: "Live Chat",
              desc:  "Available 24/7",
              sub:   "Average response: 2 min",
              color: "text-blue-500",
              bg:    "bg-blue-50",
              btn:   "Start Chat",
            },
            {
              icon:  <FaEnvelope size={28} />,
              title: "Email Support",
              desc:  "support@brand.com",
              sub:   "Response within 24 hours",
              color: "text-green-500",
              bg:    "bg-green-50",
              btn:   "Send Email",
            },
            {
              icon:  <FaPhone size={28} />,
              title: "Phone Support",
              desc:  "+1 800 123 4567",
              sub:   "Mon-Fri, 9AM - 6PM EST",
              color: "text-orange-500",
              bg:    "bg-orange-50",
              btn:   "Call Now",
            },
          ].map((item, i) => (
            <div key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className={`text-sm font-medium ${item.color} mb-1`}>{item.desc}</p>
              <p className="text-xs text-gray-400 mb-4">{item.sub}</p>
              <button className={`w-full py-2 rounded-lg text-sm font-medium ${item.bg} ${item.color} hover:opacity-80 transition`}>
                {item.btn}
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>

            {/* Category filters */}
            <div className="flex gap-2 flex-wrap">
              {faqCategories.map((cat) => (
                <button key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeFilter === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">No results found for "{search}"</p>
              </div>
            ) : (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="border-b last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        {faq.cat}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                    </div>
                    <FaChevronDown size={12}
                      className={`text-gray-400 flex-shrink-0 ml-3 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 ml-12">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Still need help?</h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill out the form and our team will get back to you within 24 hours
          </p>

          {submitted ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <FaCheckCircle size={48} className="text-green-500" />
              <p className="text-lg font-semibold text-gray-800">Message Sent!</p>
              <p className="text-sm text-gray-500">We'll get back to you within 24 hours</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                >
                  <option value="">Select a topic</option>
                  <option>Order Issue</option>
                  <option>Payment Problem</option>
                  <option>Return/Refund</option>
                  <option>Technical Issue</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Message</label>
                <textarea
                  placeholder="Describe your issue in detail..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          )}
        </div>

        {/* QUICK LINKS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Track Order",    path: "/orders",   emoji: "📦" },
              { label: "My Orders",      path: "/orders",   emoji: "🛍️" },
              { label: "Return Item",    path: "/orders",   emoji: "↩️" },
              { label: "My Account",     path: "/profile",  emoji: "👤" },
            ].map((link, i) => (
              <button key={i}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition text-left"
              >
                <span className="text-2xl">{link.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;