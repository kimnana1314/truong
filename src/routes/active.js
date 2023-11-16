const express = require("express");
const router = express.Router();
const activeController = require("../app/controllers/ActiveController");

router.get("/", activeController.show);
router.post("/", activeController.active);

module.exports = router;
