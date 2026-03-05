import multer from 'multer';


const dataStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadImages = multer({ 
  storage: dataStorage,
  fileFilter: function (req, file, cb) {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg and .png files are allowed"), false);
    }
  }, 
  limits: {
    fileSize: 1024 * 1024,
  }
});

export const uploadPdf = multer({ 
  storage: dataStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf and .docx files are allowed"), false);
    }
  }, 
  limits: {
    fileSize: 1024 * 1024 * 4, // 4MB
  }
});
