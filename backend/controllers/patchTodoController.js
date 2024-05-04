const Item = require("../models/itemModel");

const patchTodoController = async (req, res) => {
  const updateItem = req.body.id;
  console.log(updateItem);
  const updatedTask = await Item.findOneAndUpdate(
    { _id: updateItem },
    { isChecked: true },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "updated",
    updatedTask,
  });
};
module.exports = patchTodoController;
