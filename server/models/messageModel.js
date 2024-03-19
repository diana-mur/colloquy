import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true },
        senderId: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const messageModel = mongoose.model("Message", messageSchema)