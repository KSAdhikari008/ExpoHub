import multer from 'multer'; // multer stores the uploaded file temporarily in RAM instead of saving it to your server's disk.

const allowedImageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

// multer stores the uploaded file temporarily in RAM instead of saving it to your server's disk.
export const uploadImage = multer({
    
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024*1024*10, // multer doesn't allows more that 25mb
        files: 1 // number of files
    },
    fileFilter(req, file, cb){ // cb- callback that tells multer to accept or reject the req.
        if(!allowedImageMimeTypes.includes(file.mimetype)){
            return cb(new Error("Only JPEG, PNG, and WEBP images are allowed. ")); 
            // error is handled by the global err handler in app.js.
        }

        cb(null, true); // cb(error, acceptFile)
    }
}); 

