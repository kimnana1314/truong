const express = require("express");
const router = express.Router();
const orderAllController = require("../app/controllers/OrderAllController");
router.get("/", orderAllController.show);

module.exports = router;
