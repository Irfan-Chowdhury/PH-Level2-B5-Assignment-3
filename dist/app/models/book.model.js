"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// const bookSchema = new Schema<IBook>(
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies cannot be negative"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
bookSchema.methods.decreaseCopies = async function (quantity) {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.copies = 0;
        this.available = false;
    }
    return this.save();
};
// export const Book = model<IBook>("Book", bookSchema);
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
