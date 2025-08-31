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
      category,
      subCategory,
      tags,
      difficulty,
      source,
    } = req.body;

    if (!question?.heading) {
      throw new APIError(400, "Question heading is required");
    }

    // Handle uploaded files (if any)
    let uploadedImageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        uploadedImageUrls.push(result.secure_url);
      }
    }

    // Add uploaded images as examples
    if (uploadedImageUrls.length > 0) {
      uploadedImageUrls.forEach((url) => {
        if (!question.examples) question.examples = [];
        question.examples.push({
          type: "image",
          value: url,
        });
      });
    }

    const newNote = await Note.create({
      question: {
        heading: question.heading,
        description: question.description || "",
        examples: question.examples || [],
      },
      solutions: (solutions || []).map((s) => ({
        type: s.type,
        value: s.value,
      })),
      category: category || undefined,
      subCategory: subCategory || undefined,
      tags: Array.isArray(tags) ? tags : [],
      difficulty: ["Easy", "Medium", "Hard"].includes(difficulty)
        ? difficulty
        : "Medium",
      source: source || "",
    });

    return res
      .status(201)
      .json(new APIResponse(201, "Note created successfully", newNote));
  } catch (error) {
    console.error(error);
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
  
      // Create PDF with better margins
      const doc = new PDFDocument({ 
        margin: 40,
        size: 'A4',
        info: {
          Title: note.question.heading,
          Author: 'Notes App',
          CreationDate: new Date(),
        }
      });
  
      // Set headers so browser downloads PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${note.question.heading.replace(/\s+/g, '-')}.pdf`
      );
  
      // Pipe doc directly to response
      doc.pipe(res);
  
      // ================================
      // PDF STYLING FUNCTIONS
      // ================================
      
      // Function to draw a horizontal line
      const drawLine = (y) => {
        doc.moveTo(50, y).lineTo(550, y).strokeColor('#cccccc').stroke();
      };
  
      // Function to add section headers
      const addSectionHeader = (text, y) => {
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#2c5282').text(text, 50, y);
        doc.font('Helvetica').fillColor('#000000');
        return y + 25;
      };
  
      // Function to format code with syntax highlighting (basic)
      const formatCode = (code, language) => {
        // Basic syntax formatting - you could enhance this with a proper library
        doc.font('Courier').fontSize(10).fillColor('#333333');
        doc.text(code, { 
          width: 500,
          align: 'left',
          indent: 20,
          paragraphGap: 5
        });
        doc.font('Helvetica').fillColor('#000000');
      };
  
      // ================================
      // PDF CONTENT
      // ================================
  
      let y = 50;
  
      // Header with title and metadata
      doc.fontSize(24).font('Helvetica-Bold').fillColor('#2c5282')
        .text(note.question.heading, 50, y, { width: 500, align: 'center' });
      
      y += 40;
      
      // Metadata row
      doc.fontSize(10).font('Helvetica').fillColor('#666666');
      
      if (note.difficulty) {
        const difficultyColor = note.difficulty === 'Easy' ? '#38a169' : 
                               note.difficulty === 'Medium' ? '#d69e2e' : '#e53e3e';
        doc.fillColor(difficultyColor).text(`Difficulty: ${note.difficulty}`, 50, y);
      }
      
      if (note.category) doc.text(`Category: ${note.category}`, 200, y);
      if (note.subCategory) doc.text(`Sub-category: ${note.subCategory}`, 350, y);
      
      y += 20;
      doc.fillColor('#000000');
      
      // Tags
      if (note.tags?.length) {
        doc.fontSize(10).text('Tags: ' + note.tags.join(', '), 50, y);
        y += 20;
      }
      
      drawLine(y);
      y += 20;
  
      // ================================
      // EXAMPLES SECTION
      // ================================
      if (note.question.examples?.length) {
        y = addSectionHeader("Examples", y);
        
        note.question.examples.forEach((ex, i) => {
          if (ex.description) {
            doc.fontSize(12).text(`${i + 1}. ${ex.description}`, 60, y, { width: 480 });
            y += 20;
          }
          
          // Handle example images
          if (ex.images?.length) {
            ex.images.forEach((imgData, imgIndex) => {
              try {
                // Convert base64 to buffer
                const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
                const imageBuffer = Buffer.from(base64Data, 'base64');
                
                // Get image dimensions to scale properly
                const img = doc.openImage(imageBuffer);
                const aspectRatio = img.width / img.height;
                const maxWidth = 400;
                const width = Math.min(maxWidth, img.width);
                const height = width / aspectRatio;
                
                // Add image caption
                doc.fontSize(10).fillColor('#666666').text(`Example ${i + 1} - Image ${imgIndex + 1}`, 60, y);
                y += 15;
                
                // Add the image
                doc.image(imageBuffer, 60, y, { width: width, height: height });
                y += height + 20;
                
              } catch (error) {
                console.error("Error processing image:", error);
                doc.fontSize(10).fillColor('#ff0000').text(`[Error loading image ${imgIndex + 1}]`, 60, y);
                y += 15;
              }
              doc.fillColor('#000000');
            });
          }
          
          y += 10;
        });
        
        y += 10;
        drawLine(y);
        y += 20;
      }
  
      // ================================
      // SOLUTIONS SECTION
      // ================================
      if (note.solutions?.length) {
        y = addSectionHeader("Solutions", y);
        
        note.solutions.forEach((sol, i) => {
          // Solution type header
          doc.fontSize(14).font('Helvetica-Bold').fillColor('#4a5568')
            .text(`${i + 1}. ${sol.type}`, 60, y);
          y += 25;
          
          // Solution paragraphs
          if (sol.paragraphs?.length) {
            sol.paragraphs.forEach((p) => {
              doc.fontSize(12).font('Helvetica').fillColor('#000000')
                .text(`• ${p}`, 70, y, { width: 470, paragraphGap: 5 });
              y += 20;
            });
          }

          if (sol.images?.length) {
            sol.images.forEach((imgData, imgIndex) => {
              try {
                // Convert base64 to buffer
                const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
                const imageBuffer = Buffer.from(base64Data, 'base64');
                
                // Get image dimensions to scale properly
                const img = doc.openImage(imageBuffer);
                const aspectRatio = img.width / img.height;
                const maxWidth = 400;
                const width = Math.min(maxWidth, img.width);
                const height = width / aspectRatio;
                
                // Add image caption
                doc.fontSize(10).fillColor('#666666').text(`${sol.type} - Image ${imgIndex + 1}`, 60, y);
                y += 15;
                
                // Add the image
                doc.image(imageBuffer, 60, y, { width: width, height: height });
                y += height + 20;
                
              } catch (error) {
                console.error("Error processing image:", error);
                doc.fontSize(10).fillColor('#ff0000').text(`[Error loading image ${imgIndex + 1}]`, 60, y);
                y += 15;
              }
              doc.fillColor('#000000');
            });
          }
          
          // Solution code
          if (sol.code?.content) {
            y += 10;
            doc.fontSize(11).font('Helvetica-Bold').fillColor('#4a5568')
              .text(`Code (${sol.code.language || 'text'}):`, 70, y);
            y += 20;
            
            // Code background
            doc.rect(70, y, 470, 120).fill('#f7fafc').stroke('#e2e8f0');
            
            // Format code content
            formatCode(sol.code.content, sol.code.language);
            y += 130;
          }
          
          y += 20;
        });
        
        y += 10;
        drawLine(y);
        y += 20;
      }
  
      // ================================
      // METADATA SECTION
      // ================================
      y = addSectionHeader("Additional Information", y);
      
      doc.fontSize(11);
      let metaY = y;
      
      if (note.solvedBy?.length) {
        doc.text(`Solved By: ${note.solvedBy.join(", ")}`, 60, metaY);
        metaY += 20;
      }
      
      if (note.noteType?.length) {
        doc.text(`Note Type: ${note.noteType.join(", ")}`, 60, metaY);
        metaY += 20;
      }
      
      if (note.source) {
        doc.text(`Source: ${note.source}`, 60, metaY);
        metaY += 20;
      }
      
      // Footer
      doc.fontSize(9).fillColor('#666666')
        .text(`Generated on: ${new Date().toLocaleString()}`, 50, doc.page.height - 50, {
          align: 'center',
          width: 500
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