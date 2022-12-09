const User = require("../model/userModel");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const UserId = req.params.id;
    const users = await User.find({ _id: { $not: { $eq: UserId } } })
      .select(["email", "username", "avatarImage", "_id"])
      .lean()
      .exec();
    return res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};
