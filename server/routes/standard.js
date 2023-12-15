const express = require("express");
const route = express.Router();
const standard = require("../controllers/standard.controller");

route.post("/", standard.addStandards);
route.post("/getAll", standard.getStandardData);
route.get("/getById/:userId", standard.getStandardDataById);

module.exports = route;
