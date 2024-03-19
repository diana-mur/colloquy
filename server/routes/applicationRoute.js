import express from "express";
import { createApplication, deleteApplication, getApplFromUser, getApplToUser, getOneApplic } from "../controllers/applicationController.js";

const applicationRouter = express.Router()

applicationRouter.post("/addApp", createApplication)
applicationRouter.get("/toMe/:userId", getApplToUser)
applicationRouter.get("/fromMe/:userId", getApplFromUser)
applicationRouter.get("/find/:firstId/:secondId", getOneApplic)
applicationRouter.get("/deleteApp/:senderId/:recipientId", deleteApplication)

export default applicationRouter