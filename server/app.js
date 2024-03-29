const express = require("express");
const app = express();
const cors = require("cors");
const discRoute = require("./src/Routers/dishRouter");
const promotionRoute = require("./src/Routers/promoRouter");
const leaderRoute = require("./src/Routers/leaderRouter");
const userRoute = require("./src/Routers/userRoute");
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/dishes", discRoute);
app.use("/promotions", promotionRoute);
app.use("/leaders", leaderRoute);
app.use("/users", userRoute);

module.exports = app;
