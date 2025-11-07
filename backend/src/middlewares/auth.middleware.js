import jwt from 'jsonwebtoken'
import { apiError } from '../utils/apiError'
import { User } from '../models/user.model'
import { asyncHandler } from '../utils/asyncHandler'

export const verifyJWT = asyncHandler(async(req, res) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token) {
            throw new apiError(401, 'Unauthorized: Token missing')
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SERCRET);

        const user = await User.findById(decoded._id)
        if(!user) throw new apiError(401, "Unauthorized: User not found")

            req.user = user;
            next()
    } catch (error) {
        next(new apiError(401, "Unauthorized", [], error.stack))
    }
})