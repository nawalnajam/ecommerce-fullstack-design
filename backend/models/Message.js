import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);