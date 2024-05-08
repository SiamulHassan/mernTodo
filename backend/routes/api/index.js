const express = require("express");
const multer = require("multer");
const apiRouter = express.Router();
// controllers
const registrationController = require("../../controllers/registrationController");
const emailVerifyController = require("../../controllers/emailVarifyController");
const loginController = require("../../controllers/loginController");
const todoController = require("../../controllers/todoController");
const getTodoController = require("../../controllers/getTodoController");
const patchTodoController = require("../../controllers/patchTodoController");
const deleteTodoController = require("../../controllers/deleteTodoController");
const editTodoController = require("../../controllers/editTodoController");

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

apiRouter.post("/login", loginController);
// todo post
apiRouter.post("/todo", todoController);
// get todo
apiRouter.get("/todo", getTodoController);
// update todo status
apiRouter.patch("/todo", patchTodoController);
// edit todo
apiRouter.patch("/todo/editTodo", editTodoController);
//todo delete
apiRouter.delete("/todo/:id", deleteTodoController);

module.exports = apiRouter;
