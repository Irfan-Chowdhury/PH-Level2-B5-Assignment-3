import express, { Application, Request, Response  } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/middlewares/errorHandler";
import cors from 'cors';




const app: Application = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://library-management-frontend-eta-umber.vercel.app"
];

app.use(cors({
  // origin: "*",
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

// app.options('*', cors());

app.use(express.json());


app.get('/', (req : Request, res : Response) => {
    res.send('Welcome to Library Management System API');
});

app.use("/api/books", bookRoutes);

app.use("/api/borrow", borrowRoutes);

// Global Error Handler
app.use(errorHandler);


export default app;
