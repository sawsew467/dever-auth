const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await User.find({ userName: user.userName });
    await user.save();
    res.status(200).json({
      status: "success",
      data: {
        userName: user.userName,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const err = new Error("Email is not valid");
      err.status = 400;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      const { name, userName, email } = user;
      res.status(200).json({
        status: "success",
        data: {
          user: {
            name,
            userName,
            email,
          },
          token,
        },
      });
    } else {
      const err = new Error("Password is not correct");
      err.status = 400;
      return next(err);
    }
  } catch (err) {
    res.json(err);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      console.log(user);
      data.user = { user };
    }
    res.status(200).json({
      status: "success",
      data: data.user,
    });
  } catch (error) {
    res.json(error);
    return null;
  }
};
