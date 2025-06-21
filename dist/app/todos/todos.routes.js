"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', async (req, res) => {
    const db = await mongodb_1.client.db("todosDB");
    const todosCollection = await db.collection("todos");
    const todos = await todosCollection.find({}).toArray();
    res.json({
        message: "From Todos Router",
        data: todos
    });
});
exports.todosRouter.post('/create', async (req, res) => {
    const { title, description, priority } = req.body;
    const db = await mongodb_1.client.db("todosDB");
    const todosCollection = await db.collection("todos");
    const result = await todosCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const todos = await todosCollection.find({ _id: result.insertedId }).toArray();
    res.json({
        message: "Data created successfully",
        data: todos
    });
});
exports.todosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const db = await mongodb_1.client.db("todosDB");
    const collection = await db.collection("todos");
    const todo = await collection.findOne({ _id: new mongodb_2.ObjectId(id) });
    res.json({
        message: "Get Single data",
        data: todo
    });
});
exports.todosRouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const db = await mongodb_1.client.db("todosDB");
    const collection = await db.collection("todos");
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updatedTodo = await collection.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.json({
        message: "Data updated successfully",
        data: updatedTodo
    });
});
exports.todosRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const db = await mongodb_1.client.db("todosDB");
    const collection = await db.collection("todos");
    await collection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.json({
        message: "Data deleted succesfully"
    });
});
