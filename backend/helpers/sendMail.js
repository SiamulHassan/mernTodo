const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

async function sendMail(email) {
  jwt.sign({ email }, process.env.JSON_SECRET, async function (err, token) {
    if (err) {
      throw new Error("jwt sign error");
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "syeam45@gmail.com",
          pass: "plom ihbx foyi pple",
        },
      });
      await transporter.sendMail({
        from: "syeam45@gmail.com",
        to: email,
        subject: "verify yourself",
        html: `<a href="http://localhost:5173/emailVerify/${token}">Click To Verify</a>`,
      });
    }
  });
}
module.exports = sendMail;
//TodoMern
