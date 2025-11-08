import { Message } from "./models/message.model.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        // When a user joins, store theor userId
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room ${userId}`);
        });

        // handle sending message
        socket.on("sendMessage", async(data) => {
            try {
                const {sender, receiver, text, media} = data;

                const message = new Message({sender, receiver, text, media})
                await message.save();

                const populated = await message.populate([
                    {path: 'sender', select: 'username fullName'},
                    {path: 'receiver', select: 'username fullName'}
                ])

                // Emit message to receiver in real-time
                io.to(receiver).emit("receiveMessage", populated);
                io.to(sender).emit("messageSent", populated);
            } catch (error) {
                console.log("Socket message error: ", error)
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected: ",socket.id)
        });       
    });
};