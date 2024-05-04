const validateMail = require("../helpers/emaliValidation");
const sendMail = require("../helpers/sendMail");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registrationController = async (req, res) => {
  try {
    const { filename } = req.file;
    let { username, email, password, passwordConfirm } = req.body;

    // // empty fields
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    )
      throw new Error("All field is required !");
    // // pass and confirm pass
    if (password !== passwordConfirm)
      throw new Error("Password and Confirm password should be similar");
    // // valid mail and if exists // if mail exists
    // const isValidMail = validateMail(email);
    const existingMail = await User.find({ email });
    if (existingMail.length > 0) {
      throw new Error("Invalid email format or email already exists!");
    } else {
      //   // pass hash
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          throw new Error(err.message);
        } else {
          // send mail
          sendMail(email);
          // create user
          const createdUser = await User.create({
            username,
            email,
            password: hash,
            imgUrl: `/images/${filename}`,
          });
          res.status(200).json({
            status: "success",
            data: {
              createdUser,
            },
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: error.message,
      stack: error.stack,
    });
  }
};
module.exports = registrationController;
