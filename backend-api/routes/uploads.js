const express = require('express')
const path = require('path')

var router = express.Router();

const { prisma } = require("../services/prisma/db")

//File Uploads
const multer = require('multer');

// Configure multer storage and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './protected/temp/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer upload instance
const upload = multer({ storage: storage });
const fs = require('fs');
// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
    // Use multer upload instance
    upload.array('file', 50)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Retrieve uploaded files
        const files = req.files;
        const errors = [];

        // Validate file types and sizes
        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 50 * 1024 * 1024; // 50MB

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });

        // Handle validation errors
        if (errors.length > 0) {
            // Remove uploaded files
            files.forEach((file) => {
                fs.unlinkSync(file.path);
            });

            return res.status(400).json({ errors });
        }

        // Attach files to the request object
        req.files = files;

        // Proceed to the next middleware or route handler
        next();
    });
};

router.post(
    '/upload',
    uploadMiddleware,
    async (req, res) => {
        var aboutFiles = []
        try {

            // dir must be '' or 'x' or '/x/y/z'
            var dir = req.body.path || 'common';


            // Handle the uploaded files
            const files = req.files;

            // Process and store the files as required
            // For example, save the files to a specific directory using fs module
            var abouts = []
            var failed = false
            for (const file in files) {

                if (!failed) {
                    var newPath = `protected/uploads/${dir}`;

                    if (!fs.existsSync(newPath)){
                        fs.mkdirSync(newPath, { recursive: true });
                    }

                    const filePath = `protected/uploads/${dir}/${files[file].filename}`;
                  
                    fs.rename(files[file].path, filePath, (err) => {
                        if (err) {
                            failed = true
                            // Handle error appropriately and send an error response


                        }
                    });

                    const { path, mimetype } = files[file];
                    abouts.push({
                        data: {
                            file_path: filePath,
                            file_mimetype: mimetype
                        }
                    })
                }

            };

            if (failed) {
                return res.status(500).json({ error: 'Failed to store the file' });
            }
            var aboutFiles = [];
            await Promise.all(abouts.map(async (about) => {
                aboutFiles.push(await prisma.file.create(about));
            }));


            res.json({ url: aboutFiles[0].id })

            //res.send('file uploaded successfully.');

        } catch (error) {
            res.status(400).send('Error while uploading file. Try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);


const { delay } = require("../utils/utilities")



router.get('/download/:id', async (req, res) => {
    try {

        const file = await prisma.file.findUnique({
            where: { id: req.params.id },
        })

        res.set({
            'Content-Type': file.file_mimetype
        });


        console.log("Sending File: " + file.file_path + "...")

       // await delay(3000)

        res.sendFile(path.join(__dirname,  '..',  file.file_path));
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});


module.exports = router;