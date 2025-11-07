import express from 'express'
import { loginUser, registerUser, searchUser } from '../controllers/user.controller'


const router = express.Router()

router.get('/search', searchUser)

router.post("/register", registerUser)
router.post("/login", loginUser)


export {router}