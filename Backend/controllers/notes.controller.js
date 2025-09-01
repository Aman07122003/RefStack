import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import Note from "../models/notes.model.js";
import { APIResponse } from "../utils/APIResponse.js";
import { uploadImage } from "../utils/cloudinary.js";
import PDFDocument from "pdfkit";
import { uploadMultipleImages } from '../utils/cloudinary.js'; // Adjust path as needed

const createNote = asyncHandler(async (req, res) => {
  try {
    // Parse JSON from formData field "data"
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const {
      question,
      solutions,
      category,
      subCategory,
      tags,
      difficulty,
      source,
      video,
    } = parsedData;

    if (!question?.heading) {
      throw new APIError(400, "Question heading is required");
    }

    // Upload all files first and create a mapping
    const fileUploadPromises = (req.files || []).map(async (file) => {
      const result = await uploadImage(file.path);
      return {
        fieldname: file.fieldname,
        url: result.secure_url
      };
    });

    const uploadedFilesMap = {};
    const uploadResults = await Promise.all(fileUploadPromises);
    uploadResults.forEach(result => {
      uploadedFilesMap[result.fieldname] = result.url;
    });

    // Process examples using the file mapping
    const formattedExamples = (question.examples || []).map((ex, exIdx) => ({
      items: (ex.items || []).map((item, itemIdx) => {
        if (item.type === "image" && item.value === "upload_placeholder") {
          const fileFieldName = `example_${exIdx}_${itemIdx}`;
          const imageUrl = uploadedFilesMap[fileFieldName];
          
          if (imageUrl) {
            return {
              type: item.type,
              value: imageUrl
            };
          }
        }
        return {
          type: item.type,
          value: item.value
        };
      }),
    }));

    // Process solutions using the file mapping
    const formattedSolutions = (solutions || []).map((sol, solIdx) => ({
      items: (sol.items || []).map((item, itemIdx) => {
        if (item.type === "image" && item.value === "upload_placeholder") {
          const fileFieldName = `solution_${solIdx}_${itemIdx}`;
          const imageUrl = uploadedFilesMap[fileFieldName];
          
          if (imageUrl) {
            return {
              type: item.type,
              value: imageUrl
            };
          }
        }
        return {
          type: item.type,
          value: item.value
        };
      }),
    }));

    const newNote = await Note.create({
      question: {
        heading: question.heading,
        description: question.description || "",
        examples: formattedExamples,
      },
      solutions: formattedSolutions,
      category: category || undefined,
      subCategory: subCategory || undefined,
      tags: Array.isArray(tags) ? tags : [],
      difficulty: ["Easy", "Medium", "Hard"].includes(difficulty)
        ? difficulty
        : "Medium",
      source: source || "",
      video: video || "",
    });

    return res
      .status(201)
      .json(new APIResponse(201, "Note created successfully", newNote));
  } catch (error) {
    console.error("Error creating note:", error);
    
    // Clean up any uploaded files on error
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkError) {
          console.error("Error cleaning up file:", unlinkError);
        }
      });
    }
    
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(500, "Failed to create note");
  }
});

const downloadNoteAsPDF = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return next(new APIError(404, "Note not found"));
    }
    console.log(note);

    // Create PDF with margins
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: note.question.heading,
        Author: "Notes App",
        CreationDate: new Date(),
      },
    });

    // Set headers for browser download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${note.question.heading.replace(/\s+/g, "-")}.pdf`
    );

    // Pipe PDF to response
    doc.pipe(res);

    // ================================
    // Helper functions
    // ================================

    const drawLine = (y) => {
      doc.moveTo(50, y).lineTo(550, y).strokeColor("#cccccc").stroke();
    };

    const addSectionHeader = (text, y) => {
      doc.fontSize(16).font("Helvetica-Bold").fillColor("#2c5282").text(text, 50, y);
      doc.font("Helvetica").fillColor("#000000");
      return y + 25;
    };

    // ================================
    // PDF CONTENT
    // ================================
    let y = 50;

    // Title
    doc.fontSize(24).font("Helvetica-Bold").fillColor("#2c5282")
      .text(note.question.heading, 50, y, { width: 500, align: "center" });

    y += 40;

    // Metadata row
    doc.fontSize(10).font("Helvetica").fillColor("#666666");

    if (note.difficulty) {
      const difficultyColor =
        note.difficulty === "Easy"
          ? "#38a169"
          : note.difficulty === "Medium"
          ? "#d69e2e"
          : "#e53e3e";
      doc.fillColor(difficultyColor).text(`Difficulty: ${note.difficulty}`, 50, y);
    }

    if (note.category) doc.fillColor("#666666").text(`Category: ${note.category}`, 200, y);
    if (note.subCategory)
      doc.fillColor("#666666").text(`Sub-category: ${note.subCategory}`, 350, y);

    y += 20;
    doc.fillColor("#000000");

    // Tags
    if (note.tags?.length) {
      doc.fontSize(10).text("Tags: " + note.tags.join(", "), 50, y);
      y += 20;
    }

    drawLine(y);
    y += 20;

    // ================================
    // EXAMPLES
    // ================================
    if (note.question.examples?.length) {
      y = addSectionHeader("Examples", y);

      note.question.examples.forEach((ex, i) => {
        doc.fontSize(12).font("Helvetica-Bold").fillColor("#4a5568")
          .text(`Example ${i + 1}`, 60, y);
        y += 20;

        ex.items.forEach((item) => {
          if (item.type === "text") {
            doc.fontSize(11).font("Helvetica").fillColor("#000000")
              .text(item.value, 70, y, { width: 460 });
            y += 20;
          }

          if (item.type === "image") {
            try {
              doc.image(item.value, 70, y, { width: 300 });
              y += 180;
            } catch (err) {
              doc.fontSize(10).fillColor("#ff0000")
                .text("[Error loading image]", 70, y);
              y += 15;
            }
          }
        });

        y += 10;
      });

      y += 10;
      drawLine(y);
      y += 20;
    }

    // ================================
    // SOLUTIONS
    // ================================
    if (note.solutions?.length) {
      y = addSectionHeader("Solutions", y);

      note.solutions.forEach((sol, i) => {
        doc.fontSize(14).font("Helvetica-Bold").fillColor("#4a5568")
          .text(`Solution ${i + 1}`, 60, y);
        y += 25;

        sol.items.forEach((item) => {
          if (item.type === "text") {
            doc.fontSize(11).font("Helvetica").fillColor("#000000")
              .text(item.value, 70, y, { width: 460 });
            y += 20;
          }

          if (item.type === "code") {
            y += 10;
            doc.fontSize(11).font("Helvetica-Bold").fillColor("#4a5568")
              .text("Code:", 70, y);
            y += 20;

            // Code block background
            doc.rect(70, y, 460, 100).fill("#f7fafc").stroke("#e2e8f0");
            doc.fillColor("#333333").font("Courier").fontSize(10)
              .text(item.value, 75, y + 5, { width: 450 });
            doc.fillColor("#000000").font("Helvetica");
            y += 120;
          }

          if (item.type === "image") {
            try {
              doc.image(item.value, 70, y, { width: 300 });
              y += 180;
            } catch (err) {
              doc.fontSize(10).fillColor("#ff0000")
                .text("[Error loading image]", 70, y);
              y += 15;
            }
          }
        });

        y += 20;
      });

      y += 10;
      drawLine(y);
      y += 20;
    }

    // ================================
    // ADDITIONAL INFO
    // ================================
    y = addSectionHeader("Additional Information", y);
    doc.fontSize(11);
    let metaY = y;

    if (note.source) {
      doc.text(`Source: ${note.source}`, 60, metaY);
      metaY += 20;
    }

    doc.text(`Source: ${note}`, 60, metaY);

    if (note.video) {
      doc.fillColor("#1a73e8")
        .text(`Video: ${note.video}`, 60, metaY, {
          link: note.video,
          underline: true,
        });
      doc.fillColor("#000000");
      metaY += 20;
    }

    // Footer
    doc.fontSize(9).fillColor("#666666")
      .text(`Generated on: ${new Date().toLocaleString()}`, 50, doc.page.height - 50, {
        align: "center",
        width: 500,
      });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error.message);
    return next(new APIError(500, "Error generating PDF"));
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