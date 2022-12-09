const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    // console.log("sadaadss:", req.body.username);
    const user = await User.findOne({ username: username }).lean().exec();
    if (!user)
      return res.status(404).json({
        msg: "Incorrect username and password",
        status: false,
      });

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(404).json({
        message: "Incorrect username and password",
        status: false,
      });
    delete user.password;

    return res.status(201).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
