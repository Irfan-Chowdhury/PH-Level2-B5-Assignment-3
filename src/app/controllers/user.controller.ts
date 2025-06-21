import express, { Request, Response } from "express"
import { User } from "../models/user.model"
import { z } from "zod";
import bcrypt from "bcryptjs";

export const usersRoutes = express.Router();


const CreateUserZodSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        email: z.string(),
        password: z.string(),
        role: z.string().optional()
    }
)

usersRoutes.get('/', async (req: Request, res: Response) => {
    const users = await User.find();

    res.status(201).json({
        success: true,
        message: "All Users retreived successfuly",
        users
    });
});

usersRoutes.post('/create', async (req: Request, res: Response) => {



    try {
        // const body = await CreateUserZodSchema.parseAsync(req.body)
        // console.log(body, "zod body");

        // const password = await bcrypt.hash(body.password, 10)
        // console.log(password);

        // body.password = password



        //Built it and custom instance methods

        // const user = new User(body)

        // const password = await user.hashPassword(body.password)

        // user.password = password

        // await user.save()

        // built in and custom static methods

        // const password = await User.hashPassword(body.password)
        // console.log(password, "static");

        // body.password = password


        // const body = req.body;

        // const password = await bcrypt.hash(body.password, 10);
        // console.log(password, "hashed password");
        // body.password = password;

        const body = req.body;
        const user = await User.create(body);
        const password = await user.hashPassword(body.password);
        user.password = password;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User created successfuly",
            data : user
        });

    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error : error
        })
    }


})

usersRoutes.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.status(201).json({
        success: true,
        message: "User retrived successfuly",
        user
    });
})

usersRoutes.patch('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true, })

    res.status(201).json({
        success: true,
        message: "User updated successfuly",
        user
    });
});

usersRoutes.delete('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);


    res.status(201).json({
        success: true,
        message: "User Deleted successfuly",
        user
    });
});