const express = require("express");
// const { default: SetAvatar } = require("../../frontend/src/pages/SetAvatar");

const router = express.Router();

const { register, login } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);

module.exports = router;
