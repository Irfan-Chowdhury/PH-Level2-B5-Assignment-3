"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notes_model_1 = require("../models/notes.model");
exports.notesRoutes = express_1.default.Router();
exports.notesRoutes.get('/', async (req, res) => {
    // const notes = await Note.find();
    const notes = await notes_model_1.Note.find().populate("user");
    res.status(201).json({
        success: true,
        message: "Note created successfuly",
        data: notes
    });
});
exports.notesRoutes.post('/create', async (req, res) => {
    // Approch-1 to create a data
    /*
    const myNote = new Note({
        title: "My 3rd Note",
        tags: {
            label: "Important"
        }
    });
    await myNote.save();
    console.log("Note created successfully");
    */
    // Approch-2
    const body = req.body;
    const note = await notes_model_1.Note.create(body);
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: note
    });
});
exports.notesRoutes.get('/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    // const note = await Note.findOne({_id:noteId})
    // const note = await Note.findOne({title:'Learning PHP'})
    const note = await notes_model_1.Note.findById(noteId);
    res.status(201).json({
        success: true,
        message: "Note created successfuly",
        data: note
    });
});
exports.notesRoutes.patch('/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await notes_model_1.Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
    // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true })
    // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true })
    res.status(201).json({
        success: true,
        message: "Note updated successfuly",
        data: note
    });
});
exports.notesRoutes.delete('/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    const note = await notes_model_1.Note.findByIdAndDelete(noteId);
    // const note1 = await Note.findOneAndDelete({ _id: noteId })
    // const note2 = await Note.deleteOne({ _id: noteId })
    res.status(201).json({
        success: true,
        message: "Note Delete successfuly",
        note
    });
});
