"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("./app/controllers/notes.controller");
const user_controller_1 = require("./app/controllers/user.controller");
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    res.send('Welcome to Library Management System API');
});
app.use("/notes", notes_controller_1.notesRoutes);
app.use("/users", user_controller_1.usersRoutes);
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
