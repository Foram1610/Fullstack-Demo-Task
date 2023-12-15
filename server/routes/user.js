const express = require("express");
const route = express.Router();
const user = require("../controllers/user.controller");

route.post("/", user.addUser);
route.post("/getAll", user.getUserData);

module.exports = route;
