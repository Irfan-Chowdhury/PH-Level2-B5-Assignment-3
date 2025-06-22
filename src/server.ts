import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

import dotenv from "dotenv";
dotenv.config();


const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 5000;

const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.abrde.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// const PORT = 5000;

let server: Server;


async function main() {
    try {
        // await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.abrde.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
        await mongoose.connect(MONGO_URI);
        console.log("Congrats! Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

main();