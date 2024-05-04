const Item = require("../models/itemModel");

const getTodoController = async (req, res) => {
  const todos = await Item.find();
  res.status(200).json({
    status: "success",
    todos,
  });
};
module.exports = getTodoController;
