import express from "express"
import { createMessage, getMessages } from "../controllers/messageController.js"

const messageRouter = express.Router()

messageRouter.post("/", createMessage)
messageRouter.get("/:chatId", getMessages)

export default messageRouter