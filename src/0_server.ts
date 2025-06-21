import app from "./app";
import { client } from "./config/mongodb";


let server;
const port = 5000;



const bootstrap = async () => {
    await client.connect();
    console.log("Connected to MongoDB");

    // const db = await client.db("todosDB");
    // const todosCollection = await db.collection("todos").insertOne({
    //     title: "Sample Todo",
    //     body: "This is a sample todo item",
    //     completed: false,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // });

    // console.log("Inserted todo item:", todosCollection);

    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

bootstrap();

