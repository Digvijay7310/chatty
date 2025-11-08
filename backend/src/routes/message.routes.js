import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.post("/send", verifyJWT, upload.single("media"), sendMessage)

router.get("/:username", verifyJWT, getMessages)


export default router