const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1/Mecar");
};

module.exports = connectDB;
