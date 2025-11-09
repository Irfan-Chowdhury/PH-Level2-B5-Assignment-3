import express, { Application, Request, Response  } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/middlewares/errorHandler";
import cors from 'cors';




const app: Application = express();

app.use(
  cors({

    origin: ['http://localhost:5173']
   })
);

app.use(express.json());


app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to Library Management System API');
});

app.use("/api/books", bookRoutes);

app.use("/api/borrow", borrowRoutes);

// Global Error Handler
app.use(errorHandler);


export default app;
