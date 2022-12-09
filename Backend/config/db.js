const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const ConnectDb = () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = ConnectDb;


