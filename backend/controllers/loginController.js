const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//Pa$$w0rd!
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggedUser = await User.findOne({ email });
    console.log(loggedUser.imgUrl);
    if (loggedUser.length < 0) {
      throw new Error("No user found");
    } else {
      bcrypt.compare(password, loggedUser.password, function (err, result) {
        if (err) throw new Error(err.message);
        if (result) {
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
      message: error.message,
    });
  }
};
module.exports = loginController;
