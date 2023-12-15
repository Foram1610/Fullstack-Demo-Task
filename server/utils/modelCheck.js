const { User } = require("../models");

const includeFields = [
  {
    field: "user",
    model: User,
  },
];

module.exports = { includeFields };
