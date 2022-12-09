const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const imageAvatar = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: imageAvatar,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};