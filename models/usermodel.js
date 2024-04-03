const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (username, password) {
  try {
    if (!username || !password) {
      throw Error("All fields must be fields");
    }
    const user = await this.findOne({ username });
    if (!user) {
      throw Error("Incorrect Username");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect Password");
    }

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
userSchema.statics.signup = async function (username, password) {
  try {
    if (!username || !password) {
      throw Error("All fields must be fields");
    }

    const exists = await this.findOne({ username });

    if (exists) {
      throw Error("Username already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
