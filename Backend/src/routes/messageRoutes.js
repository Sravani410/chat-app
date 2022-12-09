const express = require("express");

const router = express.Router();

const { getMessage, addMessage } = require("../controllers/messageController");
// const { addMessage } = require("../controllers/messageController");

router.post("/addMessage", getMessage);
router.post("/getMessage", addMessage);

module.exports = router;
