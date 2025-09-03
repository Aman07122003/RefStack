import Note from "../models/notes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

const createNote = async (req, res) => {
  try {
    let bodyData = req.body;

    // Agar data JSON string ke form me aaya hai (FormData se)
    if (bodyData.data) {
      bodyData = JSON.parse(bodyData.data);
    }

    const { question, category } = bodyData;

    if (!question || !category) {
      throw new APIError(400, "Question and Category are required");
    }

    // Agar file upload hua hai
    let pdfUrl = null;
    if (req.file) {
      // Construct public URL for the PDF
      pdfUrl = `${req.protocol}://${req.get("host")}/files/${req.file.filename}`;
    }

    // MongoDB me save karo
    const note = await Note.create({
      ...bodyData,
      pdfFile: pdfUrl, // store the public URL
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create note",
    });
  }
};


const getNoteFile = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.file) {
      throw new APIError(404, "File not found");
    }

    res.download(note.file.filePath, note.file.fileName);
  } catch (err) {
    console.error("Error retrieving file:", err);
    res.status(500).json(new APIError(500, "Failed to retrieve file"));
  }
};

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
    deleteNote,
    getNoteFile,
    getAllNotes,
    getNoteById
};