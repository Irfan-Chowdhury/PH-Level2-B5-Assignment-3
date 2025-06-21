import express, { Request, Response } from "express"
import { Note } from "../models/notes.model"

export const notesRoutes = express.Router()


notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(201).json({
        success: true,
        message: "Note created successfuly",
        data : notes
    });
})

notesRoutes.post('/create', async (req: Request, res: Response) => {
    
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
    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data : note
    });
});

notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    // const note = await Note.findOne({_id:noteId})
    // const note = await Note.findOne({title:'Learning PHP'})

    const note = await Note.findById(noteId)

    res.status(201).json({
        success: true,
        message: "Note created successfuly",
        data : note
    });
});


notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
    // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true })
    // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true })

    res.status(201).json({
        success: true,
        message: "Note updated successfuly",
        data: note
    });
});

notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId
    const note = await Note.findByIdAndDelete(noteId)
    // const note1 = await Note.findOneAndDelete({ _id: noteId })
    // const note2 = await Note.deleteOne({ _id: noteId })

    res.status(201).json({
        success: true,
        message: "Note Delete successfuly",
        note
    })
});