
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: any = {};

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errorDetails = err;
  }

  // Handle custom thrown errors (like new Error("..."))
  if (err instanceof Error && !(err as any).name?.startsWith("Mongo")) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};
