"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 5000;
let server;
async function main() {
    try {
        await mongoose_1.default.connect('mongodb+srv://mongodb:mongodb@cluster0.abrde.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app_1.default.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
