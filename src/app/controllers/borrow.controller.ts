import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model";
import { Types } from "mongoose";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router()


borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;
         
        if (!Types.ObjectId.isValid(book)) {
            throw new Error("Invalid book ID");
        }

        const foundBook = await Book.findById(book);

        if (!foundBook) {
            throw new Error("Book not found");
        }

        if (foundBook.copies < quantity) {
            throw new Error("Not enough copies available");
        }

        await foundBook.decreaseCopies(quantity);
        // await foundBook.save();

        const borrow = await Borrow.create({ book, quantity, dueDate })
        
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });

    } catch (error) {
        // console.error("Error in borrow route:", error);
        // res.status(500).json({
        //     success: false,
        //     message: "Something went wrong",
        // });
        res.status(500).json({
            success: false,
            message: (error as Error).message
        });
    }
});




borrowRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books", // ⚠️ Collection name in lowercase and plural
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: (error as Error).message
    });
  }
});

