import Document from "../models/document.model.js";
import { uploadDocument } from "../utils/cloudinary.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadUserDocument = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { documentType, title } = req.body;

  if (!documentType) {
    throw new APIError(400, "Document type is required");
  }

  if (!req.file) {
    throw new APIError(400, "Document file is required");
  }

  if (documentType === "Resume") {
    const existing = await Document.findOne({
      user: userId,
      documentType: "Resume"
    });
  
    if (existing) {
      throw new APIError(400, "Resume already exists. Delete or update it.");
    }
  }
  
  const uploadedFile = await uploadDocument(req.file.path);

  if (!uploadedFile) {
    throw new APIError(500, "File upload failed");
  }

  const document = await Document.create({
    user: userId,
    documentType,
    title: title || documentType,
    fileUrl: uploadedFile.url,
    publicId: uploadedFile.public_id,
  });

  return res.status(201).json(
    new APIResponse(201, document, "Document uploaded successfully")
  );
});

export const getUserDocuments = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const documents = await Document.find({ user: userId })
      .sort({ createdAt: -1 });
  
    return res.status(200).json(
      new APIResponse(200, documents, "User documents fetched successfully")
    );
  });

  export const getSingleDocument = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { documentId } = req.params;
  
    const document = await Document.findOne({
      _id: documentId,
      user: userId
    });
  
    if (!document) {
      throw new APIError(404, "Document not found");
    }
  
    return res.status(200).json(
      new APIResponse(200, document, "Document fetched successfully")
    );
  });

  export const updateUserDocument = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { documentId } = req.params;
    const { title, isPrivate } = req.body;
  
    const document = await Document.findOne({
      _id: documentId,
      user: userId
    });
  
    if (!document) {
      throw new APIError(404, "Document not found");
    }
  
    // Update metadata
    if (title) document.title = title;
    if (typeof isPrivate !== "undefined") {
      document.isPrivate = isPrivate;
    }
  
    // If new file uploaded → replace
    if (req.file) {
      // Delete old file from Cloudinary
      await deleteDocument(document.publicId);
  
      const uploadedFile = await uploadDocument(req.file.path);
  
      if (!uploadedFile) {
        throw new APIError(500, "File upload failed");
      }
  
      document.fileUrl = uploadedFile.url;
      document.publicId = uploadedFile.public_id;
    }
  
    await document.save();
  
    return res.status(200).json(
      new APIResponse(200, document, "Document updated successfully")
    );
  });