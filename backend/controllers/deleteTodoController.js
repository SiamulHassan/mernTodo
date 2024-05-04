const Item = require("../models/itemModel");

const deleteTodoController = async (req, res) => {
  const delId = req.params.id;
  await Item.findOneAndDelete({ _id: delId });
};
module.exports = deleteTodoController;
