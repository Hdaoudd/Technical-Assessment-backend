const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

mongoose
  .connect(
    "mongodb+srv://hadidaoud885:usnW4jC0w8vLFXdi@cluster0.fnkqn6y.mongodb.net/"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("connected to db & listining on port", 4000, "!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
