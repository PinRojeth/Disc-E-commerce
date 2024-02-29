const express = require("express");
const app = express();
const cors = require("cors");
const discRoute = require("./src/Routers/dishRouter");
const promotionRoute = require("./src/Routers/promoRouter");
const leaderRoute = require("./src/Routers/leaderRouter");

app.use(express.json());
app.use(cors());

app.use("/dishes", discRoute);
app.use("/promotions", promotionRoute);
app.use("/leaders", leaderRoute);

module.exports = app;
