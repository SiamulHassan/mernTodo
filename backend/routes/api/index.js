const express = require("express");
const multer = require("multer");
const apiRouter = express.Router();
const registrationController = require("../../controllers/registrationController");
// multer image upload starts
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb-->callback
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    // console.log("file info", file);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
// const fileUpload = upload.fields([name:'image-file',max])
// multer image upload ends
apiRouter.post(
  "/registration",
  upload.single("myAvatar"),
  registrationController
);
module.exports = apiRouter;
