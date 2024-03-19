import express from "express";
import { createChat, findChat, findChatByUsers, findUserChats } from "../controllers/chatController.js";

const chatRouter = express.Router()

chatRouter.post("/createChat", createChat)
chatRouter.get("/:userId", findUserChats)
chatRouter.get("/find/:firstId/:secondId", findChatByUsers)
chatRouter.get("/findById/:chatId", findChat)

export default chatRouter