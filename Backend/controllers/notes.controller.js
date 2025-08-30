import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import Note from "../models/notes.model.js";
import { APIResponse } from "../utils/APIResponse.js";
import { uploadImage } from "../utils/cloudinary.js";

import PDFDocument from "pdfkit";

const createNote = asyncHandler(async (req, res) => {
    try {
      const {
        question,
        solutions,
        solvedBy,
        noteType,
        category,
        subCategory,
        tags,
        difficulty,
      } = req.body;
  
      if (!question?.heading) {
        throw new APIError(400, "Question heading is required");
      }
      if (!noteType || !Array.isArray(noteType) || noteType.length === 0) {
        throw new APIError(400, "At least one note type is required");
      }
  
      // Handle uploaded files (if any)
      let uploadedImageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadImage(file.path);
          uploadedImageUrls.push(result.secure_url);
        }
      }
  
      // Example: attach uploaded images to question.examples[0].images
      if (question?.examples?.length > 0) {
        question.examples[0].images = uploadedImageUrls;
      }
  
      const newNote = await Note.create({
        question,
        solutions: solutions || [],
        solvedBy: solvedBy || [],
        noteType,
        category: category || "",
        subCategory: subCategory || "",
        tags: tags || [],
        difficulty: difficulty || "",
      });
  
      return res
        .status(201)
        .json(new APIResponse(201, "Note created successfully", newNote));
    } catch (error) {
      console.error(error);
      throw new APIError(500, "Failed to create note");
    }
  });
  

const downloadNoteAsPDF = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      throw new APIError(404, "Note not found");
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    // Set headers so browser opens Save As dialog
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=note-${note._id}.pdf`
    );

    // Pipe doc directly to response
    doc.pipe(res);

    // ================================
    // PDF CONTENT
    // ================================
    // Question Heading
    doc.fontSize(20).text(note.question.heading, { underline: true });
    doc.moveDown();

    // Question Examples
    if (note.question.examples?.length) {
      doc.fontSize(14).text("Examples:");
      note.question.examples.forEach((ex, i) => {
        doc.moveDown(0.5).fontSize(12).text(`${i + 1}. ${ex.description}`);
      });
    }

    doc.moveDown();

    // Solutions
    if (note.solutions?.length) {
      doc.fontSize(14).text("Solutions:");
      note.solutions.forEach((sol, i) => {
        doc.moveDown().fontSize(13).text(`${i + 1}. ${sol.type}`);

        sol.paragraphs.forEach((p) => {
          doc.fontSize(12).text(`- ${p}`);
        });

        if (sol.code?.content) {
            doc.moveDown()
              .font("Courier")
              .fontSize(10)
              .text(sol.code.content, {
                width: 450,
                continued: false,
              });
            doc.font("Helvetica");
          }          
      });
    }

    // Solved By
    if (note.solvedBy?.length) {
      doc.moveDown().fontSize(12).text(`Solved By: ${note.solvedBy.join(", ")}`);
    }

    // Note Type
    if (note.noteType?.length) {
      doc.fontSize(12).text(`Note Type: ${note.noteType.join(", ")}`);
    }

    // Metadata
    if (note.category) doc.fontSize(12).text(`Category: ${note.category}`);
    if (note.subCategory) doc.fontSize(12).text(`SubCategory: ${note.subCategory}`);
    if (note.difficulty) doc.fontSize(12).text(`Difficulty: ${note.difficulty}`);
    if (note.source) doc.fontSize(12).text(`Source: ${note.source}`);

    // Footer
    doc.moveDown(2).fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, {
      align: "right",
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error(error);
    throw new APIError(500, "Error generating PDF");
  }
  });

const updateNote = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const {
        question,
        solutions,
        solvedBy,
        noteType,
        category,
        subCategory,
        tags,
        difficulty,
        source
      } = req.body;
  
      // Find the note
      const note = await Note.findById(id);
      if (!note) {
        throw new APIError(404, "Note not found");
      }
  
      // Update only provided fields
      if (question) note.question = question;
      if (solutions) note.solutions = solutions;
      if (solvedBy) note.solvedBy = solvedBy;
      if (noteType) note.noteType = noteType;
      if (category !== undefined) note.category = category.trim();
      if (subCategory !== undefined) note.subCategory = subCategory.trim();
      if (tags) note.tags = tags;
      if (difficulty !== undefined) note.difficulty = difficulty.trim();
  
      // Save updated note
      const updatedNote = await note.save();
  
      return res
        .status(200)
        .json(new APIResponse(200, "Note updated successfully", updatedNote));
    } catch (error) {
      console.error("Error updating note:", error);
      throw new APIError(500, "Failed to update note");
    }
  });

const deleteNote = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedNote = await Note.findByIdAndDelete(id);
  
      if (!deletedNote) {
        throw new APIError(404, "Note not found");
      }
  
      return res
        .status(200)
        .json(new APIResponse(200, "Note deleted successfully", deletedNote));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw new APIError(500, "Failed to delete note");
    }
  });


const getAllNotes = asyncHandler(async (req, res) => {
try {
    const {
    page = 1,
    limit = 100,
    category,
    subCategory,
    tags,
    difficulty,
    noteType,
    search,
    sort = "desc", // latest first by default
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (difficulty) filter.difficulty = difficulty;
    if (noteType) filter.noteType = { $in: [noteType] };
    if (tags) filter.tags = { $in: tags.split(",") };

    if (search) {
    filter["question.heading"] = { $regex: search, $options: "i" };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Fetch notes
    const notes = await Note.find(filter)
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

    const total = await Note.countDocuments(filter);

    return res.status(200).json(
    new APIResponse(200, "Notes fetched successfully", {
        notes,
        pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
        },
    })
    );
} catch (error) {
    console.error("Error fetching notes:", error);
    throw new APIError(500, "Failed to fetch notes");
}
});
  
const getNoteById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      const note = await Note.findById(id);
  
      if (!note) {
        throw new APIError(404, "Note not found");
      }
  
      return res
        .status(200)
        .json(new APIResponse(200, "Note fetched successfully", note));
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      throw new APIError(500, "Failed to fetch note");
    }
  });
  

export {
    createNote,
    downloadNoteAsPDF,
    updateNote,
    deleteNote,
    getAllNotes,
    getNoteById
};