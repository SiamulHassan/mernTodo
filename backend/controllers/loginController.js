const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//Pa$$w0rd!
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await User.findOne({ email });
    if (!loggedUser) {
      res.status(400).json({
        status: "faild",
        message: '"No user found"',
      });
      // throw new Error();
    } else {
      bcrypt.compare(password, loggedUser.password, function (err, result) {
        if (!result) {
          res.status(400).json({
            status: "faild",
            message: "Email or Password not matched !",
          });
        } else {
          res.status(200).json({
            status: "success",
            email,
            imgUrl: loggedUser.imgUrl,
            result: result,
            userName: loggedUser.username,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: error.message,
    });
  }
};
module.exports = loginController;
