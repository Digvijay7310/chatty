import dotenv from 'dotenv'
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';
import { connectDB } from './src/db/db.js';
import { app } from './app.js';
import {socketHandler} from './src/socketHandler.js'

const PORT = process.env.PORT;

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    }
})

socketHandler(io);
connectDB()
.then(() => {
    app.listen(process.env.PORT, ()=> {
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(`MongoDB connection error: `, error)
})