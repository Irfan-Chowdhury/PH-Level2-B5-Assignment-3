import express, { Request, Response } from "express"
import { Book } from "../models/book.model";


export const bookRoutes = express.Router()


bookRoutes.get('/', async (req: Request, res: Response) => {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      page = "1",
      limit = "10"
    } = req.query;
  
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
  
    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1;
  
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;
  
    // Main query
    const books = await Book.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);
  
    // Count total for pagination
    const totalBooks = await Book.countDocuments(query);
  
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
  

bookRoutes.post('/', async (req: Request, res: Response) => {
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


bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
});

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const book = await Book.findByIdAndDelete(bookId)
    
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data : book
        })
    } catch (err) {
        console.error("Delete error:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
});
