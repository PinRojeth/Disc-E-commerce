const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of Disc must provide"],
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Must provide price for disc"],
    },
    category: {
      type: String,
    },
    feature: {
      type: Boolean,
      default: false,
    },
    label: {
      type: Boolean,
      default: false,
    },
    // This comment should change later after create user
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = Dishes;