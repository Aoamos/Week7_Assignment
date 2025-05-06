const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  "mongodb+srv://Aoamos:0Pe4real.@cluster0.rmji8j6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected successfully...");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});
