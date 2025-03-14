import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const format = (req, file, cb) => {
    const allowedExtensions = ["jpg", "png", "gif", "jpeg"];
    const fileExtension = file.mimetype.split("/")[1];
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error("Invalid file type. Only JPG, PNG, GIF, and JPEG are allowed."), false); // Reject file
    }
}

export const uploadMiddleware = multer({
    fileFilter: format,
    limits: {fileSize: 10 * 1024 * 1024},
    storage: storage,
}).single("images");

