const User = require("../models/UserModel");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users.map((user) => {
          const { _id, name, userName, email } = user;
          return {
            _id,
            name,
            userName,
            email,
          };
        }),
      },
    });
  } catch (error) {
    res.json(error);
    return null;
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const { _id, name, userName, email } = user;
    res.status(200).json({
      status: "success",
      user: {
        _id,
        name,
        userName,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
