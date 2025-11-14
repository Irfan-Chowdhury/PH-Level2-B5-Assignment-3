import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model";
import { Types } from "mongoose";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router()




borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "10");
    const skip = (page - 1) * limit;

    const result = await Borrow.aggregate([
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: (error as Error).message,
    });
  }
});





borrowRoutes.post('/', async (req: Request, res: Response) => {
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
});



