// PASO 1: Instalar dependencias
// Ejecutá esto en tu terminal:
// npm install cloudinary multer-storage-cloudinary multer

// PASO 2: Crear archivo config/cloudinary.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dgct1ck5y",
  api_key: "682464268135567",
  api_secret: "voiR7Tb39d7OpKmtugUB_5klAaY",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "taller-hinojosa", // Puedes cambiar el nombre del folder en Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

module.exports = { cloudinary, storage };
