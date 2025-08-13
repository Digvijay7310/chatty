import express from 'express';
import "dotenv/config";
import cors from "cors"
import http from "http";
import { connectDB } from './lib/db.js';
import userRouter from './Routes/user.routes.js';
import messageRouter from './Routes/message.routes.js';
import { Server } from 'socket.io';

// Create Express app from HTTP server
const app = express();
const server = http.createServer(app)

// Intialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// Store Onlin users
export const userSocketMap = {}; // {userId: socketID}

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    // Emit online user to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=> {
        console.log("User disconnected", userId)
        delete userSocketMap(userId);
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Route setup
app.use("/api/status", (req, res)=> res.send("Server is live"))
app.use("/api/auth/", userRouter)
app.use("/api/messages", messageRouter)

// Connected to DB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("Server is running on PORT: " + PORT));