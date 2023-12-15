const { literal, fn } = require("sequelize");
const { User, Previous_Standard } = require("../models");

exports.addUser = async (req, res) => {
  try {
    const { data } = req.body;
    const userCheck = await User.findOne({ where: { email: data.email } });
    if (userCheck) {
      return res.status(400).json({ message: "User already exits!!" });
    }

    const userData = {
      name: data.name,
      email: data.email,
      age: data.age,
      current_standard: data.current_standard,
    };
    console.log("User object ==>", userData);
    const user = await User.create(userData);
    console.log("User  ==>", user);
    if (!user) {
      return res.status(400).json({ message: `User's Data is not inserted!!` });
    }
    console.log("User Previous standard ==>", data.previous_standard);
    data.previous_standard.forEach(async (standard) => {
      try {
        standard.userId = user.id;
        await Previous_Standard.create(standard);
      } catch (error) {
        console.log("Error ==>", error);
      }
    });
    return res.status(200).json({ message: "User Added!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    // let criteria = {
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"],
    //   },
    //   include: [
    //     {
    //       model: Previous_Standards,
    //       attributes: ["standard", "percentage", "remark"],
    //     },
    //   ],
    // };
    const user = await User.findAll();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
