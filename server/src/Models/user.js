const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide your email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please make sure to confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   // only run if password was actually modified
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 12);
//   this.confirmPassword = undefined;
//   next();
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
