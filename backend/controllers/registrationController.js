const registrationController = (req, res) => {
  const { filename } = req.file;
  const { username, email, password, passwordConfirm } = req.body;

  // validations
  // empty fields
  // same mail
  //

  // bcrypt

  // save to database

  const backendData = {
    username,
    email,
    password,
    passwordConfirm,
    imgUrl: `/images/${filename}`,
  };
  console.log(backendData);
};
module.exports = registrationController;
