const express = require("express");
const router = express.Router();

const { setAvatar } = require("../controllers/avatarController");

router.post("/:id", setAvatar);

module.exports = router;
