import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware'
import { upload } from '../middlewares/multer.middleware'
import { getMessages, sendMessage } from '../controllers/message.controller'

const router = express.Router()

router.post("/send", verifyJWT, upload.single("media"), sendMessage)

router.get("/:username", verifyJWT, getMessages)


export {router}