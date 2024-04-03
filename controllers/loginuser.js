const User = require("../models/usermodel");
const JWT = require("jsonwebtoken");

const createToken = (_id) => {
  return JWT.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.status(200).json({ username: user.username, token }); // Only send username and token
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send error message
  }
};
