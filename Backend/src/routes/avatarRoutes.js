const express = require("express");
const router = express.Router();

const { setAvatar } = require("../controllers/avatarController");

router.patch("/:id", setAvatar);

module.exports = router;
