const express = require("express");
const app = express();
const disRoute = require("./src/Routers/dishRouter");
const cors = require("cors");

app.use(express.json());
app.use(cors()); // Add this line to parse JSON requests

app.use("/dishes", disRoute);

module.exports = app;
