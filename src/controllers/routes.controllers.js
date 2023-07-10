const User = require("../models/model.User");
const bcrypt = require("bcrypt");
const { LoginValidator, SignUpValidator } = require("../utils/validator.utils");
const handleSignup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // validator
    const { error } = SignUpValidator.validate(req.body);

    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      res
        .status(400)
        .send("Phone Number or email is already linked to an account");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 13);
    const users = new User({
      email,
      username,
      phone,
      password: hashedPassword,
    });
    const savedUser = await users.save();
    if (savedUser) res.status(200).send("Account Created.");
    else res.status(400).send("Something went wrong");
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;

    // validator
    const { error } = LoginValidator.validate(req.body);

    if (error.details[0].type == "string.email") {
      user = await User.findOne({ email });
      if (!user) {
        res.status(401).send("Invalid Credentials...");
        return;
      }
    } else {
      user = await User.findOne({ phone: email });
      if (!user) {
        res.status(401).send("Invalid Credentials...");
        return;
      }
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).send("Invalid Credentials...");
      return;
    }

    res.status(200).send("login sucessful.");
  } catch (error) {
    res.status(405).send("Internal Server Error");
  }
};

module.exports = {
  handleSignup,
  handleLogin,
};
