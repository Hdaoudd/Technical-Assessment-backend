require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const LoginUser = require("./routes/loginuser");
const SignupUser = require("./routes/signupuser");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", LoginUser);
app.use("/api/user", SignupUser);

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
