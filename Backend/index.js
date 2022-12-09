const express = require("express");
const cors = require("cors");

const ConnectDb = require("./config/db");

const userController = require("./src/routes/userRoutes");
const loginController = require("./src/routes/loginRoutes");
const avatarController = require("./src/routes/avatarRoutes");
const allUserController = require("./src/routes/allUserRoutes");
const messageController = require("./src/routes/messageRoutes");

const app = express();
const dotenv = require("dotenv");

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/register", userController);
app.use("/login", loginController);
app.use("/setAvatar", avatarController);
app.use("/allUsers", allUserController);
app.use("/sendMessage", messageController);

const server = app.listen(process.env.PORT, async () => {
  try {
    await ConnectDb();
    console.log(`lisenting to the ${process.env.PORT}`);
  } catch (err) {
    console.log({ message: err.message });
  }
});
