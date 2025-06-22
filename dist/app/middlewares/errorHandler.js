"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails = {};
    // Handle Mongoose validation errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        errorDetails = err;
    }
    // Handle custom thrown errors (like new Error("..."))
    if (err instanceof Error && !err.name?.startsWith("Mongo")) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: errorDetails,
    });
};
exports.errorHandler = errorHandler;
