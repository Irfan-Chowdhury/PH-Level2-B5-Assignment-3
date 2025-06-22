import { model, Schema, Document } from "mongoose";
import { IBook } from "../interfaces/book.interface";


export interface BookDocument extends IBook, Document {
  decreaseCopies(quantity: number): Promise<BookDocument>;
}



// const bookSchema = new Schema<IBook>(
const bookSchema = new Schema<BookDocument>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true
  }
);

bookSchema.methods.decreaseCopies = async function (quantity: number) {
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.copies = 0;
    this.available = false;
  }
  return this.save();
};

// export const Book = model<IBook>("Book", bookSchema);

export const Book = model<BookDocument>("Book", bookSchema);
