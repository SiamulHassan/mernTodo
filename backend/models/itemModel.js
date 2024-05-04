const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemDetails: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
