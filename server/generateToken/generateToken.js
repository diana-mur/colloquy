import jwt from "jsonwebtoken";
import {} from 'dotenv/config'

export const generateAccessToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '2h'})
}