"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../../config/mongodb");
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json({
        message: "From Todos Router",
        data: JSON.parse(data)
    });
});
exports.todosRouter.post('/create', async (req, res) => {
    const { title, description, priority } = req.body;
    const db = await mongodb_1.client.db("todosDB");
    const todosCollection = await db.collection("todos");
    await todosCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const todos = await todosCollection.find({}).toArray();
    // res.send(data);
    res.json(todos);
});
exports.todosRouter.get('/:title', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // res.send(data);
    res.json(data);
});
exports.todosRouter.put('/update/:title', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
exports.todosRouter.delete('/delete/:title', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
