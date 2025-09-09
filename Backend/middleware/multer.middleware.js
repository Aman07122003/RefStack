import multer from "multer";

// Image storage
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});



// Export separate Multer instances
export const uploadImages = multer({ storage: imageStorage });

