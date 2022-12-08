const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    // console.log("sadaadss:",req.body.username)
    const usernameCheck = await User.findOne({ username: req.body.username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      return res.json({ msg: "Email already exits", status: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      // console.log("body",req.body)
      const user = await User.create(req.body);
      delete user.password;
      return res.json({ status: true, user });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    console.log("sadaadss:", req.body.username);
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        msg: "Incorrect username and password",
        status: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.json({
        msg: "Incorrect username and password",
        status: false,
      });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
// module.exports = { userRegister }
