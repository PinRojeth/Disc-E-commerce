module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Handle Mongoose validation errors
      if (
        error.name === "ValidationError" ||
        error.name === "MongoServerError" ||
        error.name
      ) {
        res.status(400).json({
          error: error.message,
        });
      }
    }
  };
};
// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };
