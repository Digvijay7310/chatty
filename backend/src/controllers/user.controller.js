import { User } from "../models/user.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


export const registerUser = asyncHandler(async(req, res) => {
    const {email, username, fullName, password} = req.body;

    const existing = await User.findOne({$or: [{email}, {username}]});
    if(existing){
        throw new apiError(400, "Email ir username already exists");
    }

    const user = new User({email, username, fullName, password});
    await user.save()

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        samSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        samSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    res.status(201).json(new apiResponse(201, {user}, 'user registered successfully'))
});

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) throw new apiError(401, 'Invalid credentials')

    const isCorrect = await user.isPasswordCorrect(password);
    if(!isCorrect) throw new apiError(401, "Invalid credentials")

     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()

     res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        samSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        samSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
})

export const searchUser = asyncHandler(async(req, res) => {
    const query = req.query.q?.trim();
    if(!query){
        return res.status(200).json(new apiResponse(200, [], "No search query provided"))
    }

    const regex = new RegExp(query, "i")

    const users = await User.find({
        $or: [
            {username: regex},
            {fullName: regex}
        ]
    })
    .select("username fullName email")
    .limit(20);
    
    res.status(200).json(new apiResponse(200, users, "User fetched successfully"))
})