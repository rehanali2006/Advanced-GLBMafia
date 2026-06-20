const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: process.env.CLOUDINARY_FOLDER || "revsison_pdfs",
        resource_type: "raw",  // required for PDFs
        format: "pdf",
        allowed_formats: ["pdf"],
        use_filename: true,
        unique_filename: true,
    },
});

// Multer upload with PDF-only filter
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    },
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB max
    },
});

module.exports = { cloudinary, upload };
