const express = require("express");
const router = express.Router();
const dangkyController = require("../app/controllers/DangkyController");

router.get("/", dangkyController.register);
router.get("/", dangkyController.register);
router.post("/", dangkyController.store);

module.exports = router;
