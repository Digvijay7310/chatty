import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/chatty`);
        console.log("Database connected: ")
        console.log(`DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongod db connection error: ",error)
    }
}