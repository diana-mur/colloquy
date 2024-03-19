import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generateAccessToken } from "../generateToken/generateToken.js";

export const auth = async (req, res) => {
    const { nickname, password } = req.body

    try {

        const user = await userModel.findOne({ nickname })

        if (!user) return res.status(400).json({ message: "Неверный никнейм или пароль." })

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) return res.status(400).json({ message: "Неверный никнейм или пароль." })

        const token = generateAccessToken(user._id)

        res.send({ _id: user._id, nickname: user.nickname, token })

    } catch (error) {
        console.log("Ошибка сервера: ", error);
        res.status(500).json({ message: error })
    }
}