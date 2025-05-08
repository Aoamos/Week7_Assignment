// Importing mongoose
const mongoose = require("mongoose");

// Define the Mongoose schema and model
const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, require: true },
    description: { type: String, require: true },
    locationFound: { type: String, require: true },
    dateFound: { type: Date, requie: true, default: Date.now },
    claimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Item = new mongoose.model("Item", itemSchema);

// Export the Item
module.exports = Item;
