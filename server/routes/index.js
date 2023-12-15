const express = require("express");
const route = express.Router();
const user = require("./user");
const standard = require("./standard");

route.use("/user", user);
route.use("/standard", standard);

module.exports = route;
