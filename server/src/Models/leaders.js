const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  designation: {
    type: String,
  },
  abbr: {
    type: String,
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Leader = mongoose.model("Leader", leaderSchema);

module.exports = Leader;
