const express = require("express");

const router = express.Router();

const { getAllUsers } = require("../controllers/allUserController");

router.get("/:id", getAllUsers);

module.exports = router;
