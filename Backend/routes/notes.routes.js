import express from "express";
import path from "path";
import Note from "../models/notes.model.js"; // make sure the path is correct
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
} from "../controllers/notes.controller.js";
import { uploadPDF } from "../middleware/multer.middleware.js";

const router = express.Router();

// Create note with PDF upload
router.post(
  "/",
  uploadPDF.single("pdfFile"), // single PDF upload
  createNote
);

// Get all notes
router.get("/", getAllNotes);

// Get single note by ID
router.get("/:id", getNoteById);

// Download PDF file by note ID
router.get("/:id/file", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.pdfFile) return res.status(404).send("File not found");

    // Extract filename from URL
    const fileName = note.pdfFile.split("/files/")[1];
    const filePath = path.join(process.cwd(), "Files", fileName);

    res.download(filePath); // download PDF
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete note
router.delete("/:id", deleteNote);

export default router;
