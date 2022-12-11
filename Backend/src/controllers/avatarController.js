const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.setAvatar = async (req, res, next) => {
  try {
    //console.log("userId:", req.body);
    const userId = req.params.id;
    //console.log("userId:",userId)
    const imageAvatar = req.body.image;
    //console.log("imageAvatar:",imageAvatar)
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: imageAvatar,
      },
      { new: true }
      //console.log("user:",userData)
    );
    return res.status(202).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};
