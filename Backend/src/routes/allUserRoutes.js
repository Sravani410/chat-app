const express = require("express");

const router = express.Router();

const { getAllUsers } = require("../controllers/allUserController");

router.post("/:id", getAllUsers);

module.exports = router;
