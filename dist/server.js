"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongodb_1 = require("./config/mongodb");
let server;
const port = 5000;
const bootstrap = async () => {
    await mongodb_1.client.connect();
    console.log("Connected to MongoDB");
    // const db = await client.db("todosDB");
    // const todosCollection = await db.collection("todos").insertOne({
    //     title: "Sample Todo",
    //     body: "This is a sample todo item",
    //     completed: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // });
    // console.log("Inserted todo item:", todosCollection);
    server = app_1.default.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
bootstrap();
