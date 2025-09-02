import Note from "../models/notes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import fs from "fs";
import { uploadPDF } from "../utils/cloudinary.js";


// Create a new note
const createNote = asyncHandler(async (req, res) => {
  try {
    // Parse JSON from 'data' field
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const {
      question,
      category,
      subCategory,
      tags,
      difficulty,
      source,
      video,
    } = parsedData;

    // Validate required fields
    if (!question || question.trim() === '') {
      throw new APIError(400, 'Question is required');
    }
    if (!category || category.trim() === '') {
      throw new APIError(400, 'Category is required');
    }

    // Handle PDF upload
    let pdfFileData = null;
    if (req.files && req.files.pdfFile && req.files.pdfFile.length > 0) {
      const pdfFile = req.files.pdfFile[0];

      // Check if file exists
      if (!pdfFile.path || !fs.existsSync(pdfFile.path)) {
        throw new APIError(400, 'PDF file not found on server');
      }

      try {
        // Upload to Cloudinary
        const uploadResult = await uploadPDF(pdfFile.path);

        pdfFileData = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
          originalName: pdfFile.originalname,
          size: pdfFile.size,
          format: 'pdf',
        };

        // File already deleted in uploadToCloudinary
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        throw new APIError(500, 'Failed to upload PDF file');
      }
    }

    // Create and save new note
    const newNote = await Note.create({
      question: question.trim(),
      file: pdfFileData,
      category: category.trim(),
      subCategory: subCategory?.trim() || '',
      tags: Array.isArray(tags) ? tags : [],
      difficulty: ['Easy', 'Medium', 'Hard'].includes(difficulty)
        ? difficulty
        : 'Medium',
      source: source?.trim() || '',
      video: video?.trim() || '',
    });

    return res
      .status(201)
      .json(new APIResponse(201, 'Note created successfully', newNote));

  } catch (error) {
    console.error('Error creating note:', error);

    // Cleanup any uploaded files in case of error
    if (req.files) {
      for (const fieldName in req.files) {
        req.files[fieldName].forEach((file) => {
          try {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          } catch (unlinkError) {
            console.error('Error cleaning up file:', unlinkError);
          }
        });
      }
    }

    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, 'Failed to create note');
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