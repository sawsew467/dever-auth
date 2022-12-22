const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "userName must be provided"],
    },
    name: {
      type: String,
      unique: false,
      trim: true,
      required: [true, "name must be provided"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email must be provided"],
    },
    password: {
      type: String,
      // unique: true,
      trim: true,
      required: [true, "Password must be provided"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: Number,
      trim: true,
    },
    seeds: {
      type: Number,
    },
    flags: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  console.log("before: ", user);
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      // console.log(user);
      next();
    }
  });
  console.log("after: ", user);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
