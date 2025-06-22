import express, { Request, Response } from "express"
import { Book } from "../models/book.model";


export const bookRoutes = express.Router()


bookRoutes.get('/', async (req: Request, res: Response) => {
    const books = await Book.find();

    res.status(201).json({
        success: true,
        message: "Book retrieved successfuly",
        data : books
    });
});


bookRoutes.post('/create', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Book.create(body)

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data : book
    });
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)

    res.status(201).json({
        success: true,
        message: "Book retrieved successfuly",
        data : book
    });
});


bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: "Book updated successfuly",
        data: book
    });
});

bookRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findByIdAndDelete(bookId)

    res.status(201).json({
        success: true,
        message: "Book deleted successfuly",
        data : book
    })
});
