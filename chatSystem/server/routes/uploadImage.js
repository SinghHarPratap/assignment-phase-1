const multer = require("multer");
const path = require("path");

// Image Upload
const imageStorage = multer.diskStorage({
  destination: "upload", // Destination to store image
  filename: (req, file, cb) => {
    console.log(file)
    cb(
      null,
      file.originalname
    );
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

module.exports = function (db, app, ObjectID) {
  app.post(
    "/api/uploadImage",
    imageUpload.single("image"),
    function (req, res) {
      res.send(req.file)
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );
};
