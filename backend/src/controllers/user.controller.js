import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const registerUser = asyncHandler(async(req, res) => {
    try {
        console.log("register user: ",req.body)
        const {email, username, fullName, password} = req.body;
    
        const existing = await User.findOne({$or: [{email}, {username}]});
        console.log("existing: ", existing)
        if(existing) throw new apiError(400, "Email or username already exists");
        
        const user = new User({email, username, fullName, password});
        console.log("User: ",user)
        await user.save();
    
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
    
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    
        res.status(201).json(new apiResponse(201, {user}, 'User registered successfully'));
    } catch (error) {
        console.error("User regsiter error: ", error)
        res.status(500).json(new apiError(500, null, "internal server error"))
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log("login user ",email, password)

        const user = await User.findOne({email})
        if(!user) throw new apiError(401, 'Invalid credentials')
    
        const isCorrect = await user.isPasswordCorrect(password);
        if(!isCorrect) throw new apiError(401, "Invalid credentials")
    
         const accessToken = user.generateAccessToken()
         const refreshToken = user.generateRefreshToken()
    
         res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });
    
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json(new apiResponse(200, {user}, "user login successfully"))
    } catch (error) {
        console.log("Login user error: ", error)
    }
})

export const searchUser = asyncHandler(async(req, res) => {
    try {
        const query = req.query.q?.trim();
        console.log("query ",query)
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
    } catch (error) {
        console.error('user Search error ', error)
        res.status(500).json(apiError(500, "Somthing went wrong"))
    }
})

export const logoutUser = asyncHandler(async(req, res) => {

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    })

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    })
    res.status(200).json(new apiResponse(200, null, 'Loggout successfully'))
})

export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json(new apiResponse(401, null, 'Refresh token not found'));
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json(new apiResponse(403, null, 'Invalid refresh token'));

      // Find user from decoded token
      const user = await User.findById(decoded._id);
      if (!user) return res.status(404).json(new apiResponse(404, null, 'User not found'));

      const accessToken = user.generateAccessToken();
      res.status(200).json(new apiResponse(200, { accessToken }, 'Access Token refreshed'));
    });
  } catch (error) {
    throw new ApiError(404, 'not refreshToken');
  }
});