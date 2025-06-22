import express, { Application, Request, Response  } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";
import { usersRoutes } from "./app/controllers/user.controller";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";


const app: Application = express();

app.use(express.json());


app.get('/api', (req : Request, res : Response) => {
    res.send('Welcome to note app');
});

app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);


export default app;
