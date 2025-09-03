import multer from "multer";
import path from "path";

// Image storage
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// PDF storage
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Files/"); // Save PDFs in Files/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique name
  },
});

// Export separate Multer instances
export const uploadImages = multer({ storage: imageStorage });
export const uploadPDF = multer({ storage: pdfStorage });
