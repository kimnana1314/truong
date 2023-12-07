const express = require("express");
const router = express.Router();
const manageController = require("../app/controllers/ManageController");

router.get("/", manageController.show);
module.exports = router;
