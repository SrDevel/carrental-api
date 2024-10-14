const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'vehicles', // Carpeta donde se almacenarán las imágenes en Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
        public_id: (req, file) => new Date().getTime() // Genera un nombre único basado en la fecha actual
    }
});

const upload = multer({ storage });

module.exports = upload;
