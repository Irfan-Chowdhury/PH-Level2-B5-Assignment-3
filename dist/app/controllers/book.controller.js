"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.get('/', async (req, res) => {
    const { filter, sortBy = "createdAt", sort = "desc", page = "1", limit = "10" } = req.query;
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOption = {};
    sortOption[sortBy] = sort === "asc" ? 1 : -1;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    // Main query
    const books = await book_model_1.Book.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);
    // Count total for pagination
    const totalBooks = await book_model_1.Book.countDocuments(query);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
        pagination: {
            total: totalBooks,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(totalBooks / limitNumber),
        },
    });
});
exports.bookRoutes.post('/', async (req, res) => {
    const body = req.body;
    const book = await book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    });
});
exports.bookRoutes.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfuly",
        data: book
    });
});
exports.bookRoutes.put('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await book_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
});
exports.bookRoutes.delete('/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: book
        });
    }
    catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
