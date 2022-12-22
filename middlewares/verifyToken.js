const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Access Authorization from request header
  const Authorization = req.header("authorization");
  if (!Authorization) {
    // Error: Unauthorized
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  // Get token
  const token = Authorization.replace("Bearer ", "");
  console.log(token);
  // Verify token
  const { userId } = jwt.verify(token, process.env.APP_SECRET);
  // Assign request
  console.log("success")
  req.user = { userId };
  next();
};
