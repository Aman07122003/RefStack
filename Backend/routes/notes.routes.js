import express from 'express';
import {
    createNote,
    downloadNoteAsPDF,
    updateNote,
    deleteNote,
    getAllNotes,
    getNoteById
} from '../controllers/Notes.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.route("/").post(
  upload.fields([
    { name: "pdfFile", maxCount: 1 }, // match frontend
  ]),
  createNote
);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/:id/download', downloadNoteAsPDF);

export default router;
