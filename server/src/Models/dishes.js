const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    rating: { type: Number, default: 1, min: 1, max: 5 },
    comment: { type: String },
    author: { type: String },
  },
  { timestamps: true }
);

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
      require: [true, "Must provide price for disc"],
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
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);
const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = Dishes;
