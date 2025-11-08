import jwt from 'jsonwebtoken'
import { apiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token) {
            throw new apiError(401, 'Unauthorized: Token missing')
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id)
        if(!user) throw new apiError(401, "Unauthorized: User not found")

            req.user = user;
            next()
    } catch (error) {
        next(new apiError(401, "Unauthorized", [], error.stack))
    }
}