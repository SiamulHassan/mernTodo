const express = require("express");
const multer = require("multer");
const apiRouter = express.Router();
const registrationController = require("../../controllers/registrationController");
const emailVerifyController = require("../../controllers/emailVarifyController");
// multer image upload starts
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb-->callback
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
// multer image upload ends

////////////////////// ROUTES
apiRouter.post(
  "/registration",
  upload.single("myAvatar"),
  registrationController
);
apiRouter.post("/emailVerify", emailVerifyController);
module.exports = apiRouter;
