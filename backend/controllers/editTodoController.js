const Item = require("../models/itemModel");

const editTodoController = async (req, res) => {
  const { editId, itemName, itemDetails } = req.body;
  await Item.findOneAndUpdate(
    { _id: editId },
    {
      itemName,
      itemDetails,
    },
    { new: true }
  );
};
module.exports = editTodoController;
