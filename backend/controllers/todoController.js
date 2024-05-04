const Item = require("../models/itemModel");

const todoController = async (req, res) => {
  const { itemName, itemDetails } = req.body;

  const items = await Item.create({
    itemName,
    itemDetails,
  });
  res.status(200).json({
    status: "success",
    items,
  });
};
module.exports = todoController;
