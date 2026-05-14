import Message from "../models/Message.js";

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Message.find({ participants: req.user.id })
      .populate("participants", "name email")
      .sort("-lastUpdated");
    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Message.findById(conversationId);
    if (!conversation) return res.status(404).json({ success: false });
    res.json({ success: true, messages: conversation.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};