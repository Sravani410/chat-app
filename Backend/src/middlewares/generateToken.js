const jwt = require("jsonwebtoken");

const GenerateToken = async (username) => {
  try {
    const token = jwt.sign(
      { username: username.toString() },
      "newchatterapplication"
    );
    return token;
  } catch (err) {
    return err.message;
  }
};

module.exports = GenerateToken;
