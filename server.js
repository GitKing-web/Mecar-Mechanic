require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./src/routes/routes.router");
const connectDB = require("./src/configs/configs.index");

app.use(express.json());
app.use("/", router);

app.listen(PORT, async () => {
  await connectDB()
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error));
  console.log("server is running on...", PORT);
});
