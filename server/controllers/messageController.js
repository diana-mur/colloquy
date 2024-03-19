import { messageModel } from "../models/messageModel.js"

export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body

    const message = new messageModel({
        chatId, senderId, text
    })

    try {

        const response = await message.save()

        res.send(response)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params

    try {

        const messages = await messageModel.find({ chatId })

        res.send(messages)

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}