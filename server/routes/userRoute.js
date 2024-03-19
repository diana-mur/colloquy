import express from "express";
import { reg } from "../controllers/reg.js";
import { auth } from "../controllers/auth.js";
import { addFriend, deleteFriend, findUserById, getUsers, subscribe, unsubscribe } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/reg", reg)
userRouter.post("/auth", auth)
userRouter.get("/find/:userId", findUserById)
userRouter.get("/getUsers", getUsers)
userRouter.get("/subscribe/:senderId/:recipientId", subscribe)
userRouter.get("/unsubscribe/:senderId/:recipientId", unsubscribe)
userRouter.get("/addFriend/:senderId/:recipientId", addFriend)
userRouter.get("/deleteFriend/:senderId/:recipientId", deleteFriend)

export default userRouter