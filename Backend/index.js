const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const ConnectDb = require("./config/db");

const app = express();
const dotenv = require("dotenv");

dotenv.config();
// middlewares
app.use(cors());
app.use(express.json());

const userController = require("./src/routes/userRoutes");
const loginController = require("./src/routes/loginRoutes");
const avatarController = require("./src/routes/avatarRoutes");
const allUserController = require("./src/routes/allUserRoutes");
const messageController = require("./src/routes/messageRoutes");

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

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credential: true,
  },
});

//we have to put express as global for online users

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
