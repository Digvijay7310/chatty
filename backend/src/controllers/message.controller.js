import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const sendMessage = asyncHandler(async(req, res) => {
    try {
        const {receiver, text} = req.body;
        let mediaUrl = null;
    
        if(req.file){
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if(uploadResult) mediaUrl = uploadResult.secure_url
        }
    
        const message = new Message({
            sender: req.user._id,
            receiver,
            text: text || "",
            media: mediaUrl || null
        })
    
        await message.save()
    
        res.status(201).json(new apiResponse(201, message, "Message sent successfully"))
    } catch (error) {
        console.log("Send message error: ", error)
    }
})

export const getMessages = asyncHandler(async(req, res) => {
    try {
        const {username} = req.params;
    
        const otherUser = await User.findOne({username: username.trim()}).select('_id username fullName')
        if(!otherUser) {
            throw new apiError(404, 'User not found')
        }
    
        const messages = await Message.find({
            $or: [
                {sender: req.user._id, receiver: otherUser._id},
                {sender: otherUser._id, receiver: req.user._id}
            ]
        }).sort({createdAt: 1})
        .populate('sender', 'username fullName')
        .populate('receiver', 'username fullName')
    
        res.status(200).json(new apiResponse(200, {with: otherUser.username, messages}, "Messages fetched successfully"))
    } catch (error) {
     console.log("Get message error: ", error)   
    }
})