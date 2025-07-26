// models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
      trim: true,
    },
    aiReply: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const chat = mongoose.model("chat", chatSchema);

export default chat;
