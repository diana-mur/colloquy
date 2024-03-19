import validator from "validator";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generateAccessToken } from "../generateToken/generateToken.js";

export const reg = async (req, res) => {
    try {

        const { nickname, email, password } = req.body

        let user = await userModel.findOne({ email })
        let nick = await userModel.findOne({ nickname })

        if (user) return res.status(400).json({ message: "Пользователь уже существует" })

        if (nick) return res.status(400).json({ message: "Никнейм уже занят" })

        if (!nickname || !email || !password) return res.status(400).json({ message: "Все поля должны быть заполнены" })

        if (!validator.isEmail(email)) return res.status(400).json({ message: "Введите корректный адрес электронной почты" })

        user = new userModel({ nickname, email, password })

        const salt = bcrypt.genSaltSync(11)
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        const token = generateAccessToken(user._id)

        res.send({ _id: user._id, nickname: user.nickname, email: user.email, token })

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}