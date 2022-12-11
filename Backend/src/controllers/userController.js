const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const GenerateToken = require("../middlewares/generateToken");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    // console.log("sadaadss:",req.body.username)
    const usernameCheck = await User.findOne({ username: username }).lean().exec();
    console.log(usernameCheck);

    if (usernameCheck) {
      console.log(usernameCheck);
      return res
        .status(404)
        .json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email: email }).lean().exec();
    if (emailCheck) {
      return res
        .status(404)
        .json({ msg: "Email already exits", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    // console.log("body",req.body)

    const token = await GenerateToken(username);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      registerToken: token,
    });
    console.log("users", user);
    return res.status(201).json({ status: true, user });
  } catch (err) {
    // return res.status(404).json({msg:err.message});
    next(err);
  }
};

// module.exports = { userRegister }
