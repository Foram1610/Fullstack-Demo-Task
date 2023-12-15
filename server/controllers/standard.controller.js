const { getAllData } = require("../middlewares/getAllData");
const { Previous_Standard } = require("../models");

exports.addStandards = async (req, res) => {
  try {
    const data = req.body;
    const standard = await Previous_Standard.create(data);
    if (!standard) {
      return res.status(400).json({ message: "Not able to add standard!!" });
    }
    return res.status(200).json({ message: "Standard Add!!" });
  } catch (error) {
    return res.status(400).json({ message: "Error ==>", error });
  }
};

exports.getStandardData = async (req, res) => {
  try {
    const option = { ...req.body };
    if (!option.hasOwnProperty("query")) {
      option["query"] = {};
    }
    console.log("Data ==>", option);
    const standard = await getAllData(option, Previous_Standard);
    return res.status(200).json(standard);
  } catch (error) {
    console.log("Error ==>", error.message);
    return res.status(400).json({ message: "Error ==>", error });
  }
};

exports.getStandardDataById = async (req, res) => {
  try {
    const standards = await Previous_Standard.findAll({
      where: { user: req.params.userId },
    });
    return res.status(200).json(standards);
  } catch (error) {
    return res.status(400).json({ message: "Error ==>", error });
  }
};
