const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const exitstUser = await User.find({ userName: user.userName });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    console.log(user);
    res.status(200).json({
      status: "success",
      data: {
        token,
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
      //Error: Email is not correct
      const err = new Error("Email is not valid");
      err.status = 400;
      return next(err);
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      const { name } = user;

      res.status(200).json({
        status: "success",
        data: {
          // userName: name,
          user: user,
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
      // data.user = { userName: user.userName };
      data.user = { user };
      // data = user;
    }
    // console.log(data);
    res.status(200).json({
      status: "success",
      data: data.user,
      // data: data
    });
  } catch (error) {
    res.json(error);
    return null;
  }
};
