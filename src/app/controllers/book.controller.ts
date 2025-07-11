import express, { Request, Response } from "express"
import { Book } from "../models/book.model";


export const bookRoutes = express.Router()


bookRoutes.get('/', async (req: Request, res: Response) => {
    // const books = await Book.find();

    const { filter, sortBy = "createdAt", sort = "desc", limit = "10" } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
                            .sort(sortOption)
                            .limit(parseInt(limit as string));

    res.status(201).json({
        success: true,
        message: "Book retrieved successfuly",
        data : books
    });
});


bookRoutes.post('/', async (req: Request, res: Response) => {
    // try {
        const body = req.body;
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data : book
        });
        
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: (error as Error).message
    //     });
    // }
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


bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
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
