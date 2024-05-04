const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const emailVerifyController = async (req, res) => {
  try {
    const { token } = req.body;
    const decode = jwt.verify(token, process.env.JSON_SECRET);

    const findUser = await User.findOne({ email: decode.email });
    if (!findUser.emailVerified) {
      await User.findOneAndUpdate(
        { email: decode.email },
        { emailVerified: true }
      );
      res.status(200).json({
        status: "success",
        message: "Email successfully varified !",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: `Problelm with verifying email ${error.message}`,
    });
  }
};
module.exports = emailVerifyController;
