import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { getMessages, getUserForSidebar, markMessageAsSeen, sendMessage } from '../controllers/message.controller.js'

const messageRouter = express.Router()

messageRouter.get("/users", protectRoute, getUserForSidebar)
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.put("/mark:id", protectRoute, markMessageAsSeen)
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter