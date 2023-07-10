const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = async () => {
  await mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.LOCALHOST : process.env.PUBLICHOST);
};

module.exports = connectDB;
