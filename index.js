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

// app.use("/api/user", LoginUser);
// app.use("/api/user", SignupUser);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listining on port", process.env.PORT, "!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
