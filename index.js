const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// ? : Import Routes

const userRoutes = require("./routes/userRoutes.js");

//? : Configs

dotenv.config();
app.use(express.json());
app.use(cors());

//?:  Config Routes
app.use("/", userRoutes);

// ? : Port

const PORT = process.env.PORT;
const dbName = "ecommerce";
mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server Port is on", PORT, " ", dbName));
    console.log(`Connection Successfully`);
  })
  .catch((error) => console.log(`${error} did not connect!`));
