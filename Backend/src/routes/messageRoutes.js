const express = require("express");

const router = express.Router();

const { getMessage, addMessage } = require("../controllers/messageController");
// const { addMessage } = require("../controllers/messageController");

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessage);

module.exports = router;
