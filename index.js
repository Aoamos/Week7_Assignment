const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/items");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Server and database configuration
const PORT = process.env.PORT || 8000;
const MONGO_URI =
  "mongodb+srv://Aoamos:0Pe4real.@cluster0.rmji8j6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected successfully...");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the lost and found platform" });
});

// Create a new item
app.post("/create-item", async (req, res) => {
  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  // Basic field validation
  if (!itemName || !description) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Parse date if in DD/MM/YYYY format
  let parsedDate = dateFound;
  if (typeof dateFound === "string" && dateFound.includes("/")) {
    const [day, month, year] = dateFound.split("/");
    parsedDate = new Date(`${year}-${month}-${day}`);
  }

  // Create and save new item
  const newItem = new Item({
    itemName,
    description,
    locationFound,
    dateFound: parsedDate,
    claimed,
  });

  await newItem.save();

  res.status(201).json({
    message: "Success",
    item: newItem,
  });
});

// View all unclaimed items
app.get("/items/unclaimed", async (req, res) => {
  const items = await Item.find({ claimed: false });
  res.status(200).json({
    message: "Success",
    items,
  });
});

// View one item by its ID
app.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({
    message: "Item retrieved successfully",
    item,
  });
});

// Update an item by ID
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  // Parse date if needed
  let parsedDate = dateFound;
  if (typeof dateFound === "string" && dateFound.includes("/")) {
    const [day, month, year] = dateFound.split("/");
    parsedDate = new Date(`${year}-${month}-${day}`);
  }

  const updatedFields = {
    itemName,
    description,
    locationFound,
    dateFound: parsedDate,
    claimed,
  };

  const updatedItem = await Item.findByIdAndUpdate(id, updatedFields, {
    new: true, // return updated document
  });

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({
    message: "Item updated successfully",
    item: updatedItem,
  });
});

// Delete an item by ID
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);

  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({
    message: "Item deleted successfully",
    item: deletedItem,
  });
});
