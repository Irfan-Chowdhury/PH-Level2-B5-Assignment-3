"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
exports.usersRoutes = express_1.default.Router();
const CreateUserZodSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
exports.usersRoutes.get('/', async (req, res) => {
    const users = await user_model_1.User.find();
    // let users = [];
    // *** Filtering ***
    // const userEmail = req.query.email ? req.query.email : "";
    // if (userEmail) {
    //     users = await User.find({ email: userEmail });
    // } else {
    //     users = await User.find();
    // }
    // *** Sorting ***
    // users = await User.find().sort({"email" : "asc"});
    // users = await User.find().sort({"email" : "ascending"});
    // users = await User.find().sort({"email" : "desc"});
    // users = await User.find().sort({"email" : "descending"});
    // users = await User.find().sort({"email" : 1}); // 1 for ascending, -1 for descending
    // users = await User.find().sort({"email" : -1}); // 1 for ascending, -1 for descending
    // *** Skipping ***
    // users = await User.find().skip(10); // skip 0 documents and limit to 10 documents
    // *** Limiting ***
    // users = await User.find().limit(10); // limit to 10 documents
    res.status(201).json({
        success: true,
        message: "All Users retreived successfuly",
        users
    });
});
exports.usersRoutes.post('/create', async (req, res) => {
    try {
        // const body = await CreateUserZodSchema.parseAsync(req.body)
        // console.log(body, "zod body");
        // const password = await bcrypt.hash(body.password, 10)
        // console.log(password);
        // body.password = password
        // const body = req.body;
        // const password = await bcrypt.hash(body.password, 10);
        // console.log(password, "hashed password");
        // body.password = password;
        //*** Built in and custom instance methods ***
        // const body = req.body;
        // const user = new User(body)
        // const password = await user.hashPassword(body.password)
        // user.password = password
        // await user.save()
        // *** Built in and custom static methods ****
        const body = req.body;
        const password = await user_model_1.User.hashPassword(body.password);
        body.password = password;
        const user = await user_model_1.User.create(body);
        res.status(201).json({
            success: true,
            message: "User created successfuly",
            data: user
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});
exports.usersRoutes.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await user_model_1.User.findById(userId);
    res.status(201).json({
        success: true,
        message: "User retrived successfuly",
        user
    });
});
exports.usersRoutes.patch('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = await user_model_1.User.findByIdAndUpdate(userId, updatedBody, { new: true, });
    res.status(201).json({
        success: true,
        message: "User updated successfuly",
        user
    });
});
exports.usersRoutes.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    // const user = await User.findByIdAndDelete(userId);
    const user = await user_model_1.User.findOneAndDelete({ _id: userId }, { new: true });
    res.status(201).json({
        success: true,
        message: "User Deleted successfuly",
        user
    });
});
// *** Built in custom Instance Methods ***
// const body = req.body;
// const user = await User.create(body);
// const password = await user.hashPassword(body.password);
// user.password = password;
// await user.save();
