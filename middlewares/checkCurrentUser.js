const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
  // Access Authorization from request header
  const Authorization = req.header("authorization");
  let token;
  if (!Authorization) {
    // Error: Unauthorized
    req.user = null;
    next();
  } else {
    // Get token from authorization header
    token = Authorization.replace("Bearer ", "");
  }
  try {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.user = { userId };
    next();
  } catch (err) {
    
    req.user = null;
    next();
  }
};
