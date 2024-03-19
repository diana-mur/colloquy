import { chatModel } from "../models/chatModel.js";

export const createChat = async (req, res) => {
    const { firstId, secondId } = req.body

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })

        if (chat) return res.status(200).json(chat)

        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save()

        res.send(response)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
};

export const findUserChats = async (req, res) => {
    const { userId } = req.params

    try {

        const chats = await chatModel.find({
            members: { $in: [userId] }
        })

        res.send(chats)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
};

export const findChatByUsers = async (req, res) => {
    const { firstId, secondId } = req.params

    try {

        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })

        if (!chat) {
            const newChat = new chatModel({
                members: [firstId, secondId]
            })

            const response = await newChat.save()

            res.send(response)
        }

        res.send(chat)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
};

export const findChat = async (req, res) => {
    const { chatId } = req.params

    try {

        const chat = await chatModel.findOne({
            _id: chatId
        })

        res.send(chat)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
};