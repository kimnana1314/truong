const express = require("express");
const router = express.Router();
const exitsController = require("../app/controllers/ExitsController");

router.post("/", exitsController.exits);

module.exports = router;
