const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB Connection error : ${err}`);
});

db.once("open", () => {
  console.log(`Connected to MongoDB`);
});

module.exports = mongoose;
