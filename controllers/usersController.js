const User = require("../models/UserModel");

exports.getAllUser = async (req, res, next) => {
  try {
    console.log("getAllUser");
    const users = await User.find({});
    console.log("finnish");
    console.log(users);
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
      // data: data
    });
  } catch (error) {
    res.json(error);
    return null;
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({
      status: "success",
      user: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
