const CatchError = require("./CatchError");
const ErrorHandler = require("../Utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Models/user");
module.exports = {
  verifyOrdinaryUser: CatchError(async (req, res, next) => {
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

    // Check if user changed password after the token was issued
    if (freshUser.changePasswordAfter(decoded.iat)) {
      throw new ErrorHandler(
        "User recently changed password! Please login again.",
        401
      );
    }

    // Grand Access to protected route
    req.user = freshUser;
    next();
  }),

  verifyAdmin: CatchError(async (req, res, next) => {
    if (!req.user.admin) {
      throw new ErrorHandler(
        "You are not authorized to perform this operation!"
      );
    }
    next();
  }),
};
