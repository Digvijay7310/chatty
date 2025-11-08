import express from 'express'
import { loginUser, logoutUser, registerUser, searchUser } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../validations/user.validation.js'


const router = express.Router()

router.get('/search', searchUser)

router.post("/register", validate(registerSchema), registerUser)
router.post("/login", validate(loginSchema), loginUser)
router.post('/logout', verifyJWT, logoutUser)


export default router