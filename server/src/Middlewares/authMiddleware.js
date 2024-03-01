const CatchError = require("./CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Models/user");
module.exports = {
  protectedRoute: CatchError(async (req, res, next) => {
    // Check Authorization with token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);

    // Check if the token is not exist
    if (!token) {
      throw new ErrorHandler(
        "Your are not logged in! Please login to get access"
      );
    }

    // Verify Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    if (!decoded) {
      throw new ErrorHandler("Invalid Token. Please Login again!");
    }

    // Check if users exist
    const freshUser = await User.findById(decoded.id);
    // console.log(freshUser);
    if (!freshUser) {
      throw new ErrorHandler(
        "The user belonging to this token does no longer exist."
      );
    }
    next();
  }),
};
