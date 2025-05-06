const mongoose = require("mongoose");

// Define the schema for found items
const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  locationFound: { type: String, required: true },
  dateFound: { type: Date, requied: true, default: Date.now },
  claimed: { type: Boolean, default: false },
});

const Item = new mongoose.model("Item", itemSchema);

module.exports = Item;
