"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todos', todos_routes_1.todosRouter);
app.get('/', (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header
    });
    next();
    res.send('Welcome to todos app');
});
async (req, res, next) => {
    try {
        res.send('Welcome to Todos App');
    }
    catch (error) {
        next(error);
    }
};
app.get('/error', async (req, res, next) => {
    try {
        res.send('Welcome to error er duniya');
    }
    catch (error) {
        next(error);
    }
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error });
    }
});
exports.default = app;
