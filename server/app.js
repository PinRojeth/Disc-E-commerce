const express = require("express");
const app = express();
const cors = require("cors");
const discRoute = require("./src/Routers/dishRouter");
const promotionRoute = require("./src/Routers/promoRouter");

app.use(express.json());
app.use(cors());

app.use("/dishes", discRoute);
app.use("/promotions", promotionRoute);

module.exports = app;
