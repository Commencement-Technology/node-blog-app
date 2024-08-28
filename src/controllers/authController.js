const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token,
          user,
        });
      }
    );
  } catch (error) {
    res.json({
      success: false,
      message: "An error occured while logging in a user",
      error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = new User({ username, email, password });

    await user.save();

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          token,
          user,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occured while registering a user",
      err,
    });
  }
};

module.exports = { login, register };
