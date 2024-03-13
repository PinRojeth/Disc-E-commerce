const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
  label: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
