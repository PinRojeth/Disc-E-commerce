class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the message from the default error parent class
    this.statusCode = statusCode;
    this.isOperational = true; // adding a bool field for testing if the error is an operational error

    Error.captureStackTrace(this, this.constrcutor);
  }
}

module.exports = ErrorHandler;
