import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MessagesPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/signin");
    else fetchConversations();
  }, [user]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setConversations(data.conversations);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-800px mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">No conversations</div>
        ) : (
          conversations.map(conv => (
            <div key={conv._id} className="bg-white rounded-xl p-4 shadow mb-3 cursor-pointer hover:shadow-md">
              <p className="font-semibold">{conv.participants.find(p => p._id !== user.id)?.name}</p>
              <p className="text-gray-500 text-sm truncate">{conv.messages[conv.messages.length - 1]?.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;