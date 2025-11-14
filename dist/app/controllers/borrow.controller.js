"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const mongoose_1 = require("mongoose");
const book_model_1 = require("../models/book.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page || "1");
        const limit = parseInt(req.query.limit || "10");
        const skip = (page - 1) * limit;
        const result = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            { $unwind: "$bookInfo" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                    totalQuantity: 1,
                },
            },
            // ---- PAGINATION USING FACET ----
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $skip: skip },
                        { $limit: limit }
                    ],
                },
            },
            {
                $unwind: "$metadata",
            },
            {
                $project: {
                    data: 1,
                    total: "$metadata.total",
                },
            },
        ]);
        const response = result[0] || {
            data: [],
            total: 0,
        };
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: response.data,
            pagination: {
                total: response.total,
                page,
                limit,
                totalPages: Math.ceil(response.total / limit),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error: error.message,
        });
    }
});
exports.borrowRoutes.post('/', async (req, res) => {
    const { book, quantity, dueDate } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(book)) {
        throw new Error("Invalid book ID");
    }
    const foundBook = await book_model_1.Book.findById(book);
    if (!foundBook) {
        throw new Error("Book not found");
    }
    if (foundBook.copies < quantity) {
        throw new Error("Not enough copies available");
    }
    await foundBook.decreaseCopies(quantity);
    // await foundBook.save();
    const borrow = await borrow_model_1.Borrow.create({ book, quantity, dueDate });
    res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
});
