import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './src/routes/user.routes.js'
import messageRoutes from './src/routes/message.routes.js'


const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/messages", messageRoutes)

app.get('/', (req, res) => {
    res.send(`Server is running: `, process.env.PORT)
});

export {app}