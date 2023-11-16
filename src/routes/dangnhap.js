const express = require("express");
const router = express.Router();
const dangnhapController = require("../app/controllers/DangnhapController");

router.get("/", dangnhapController.show);
router.post("/", dangnhapController.login);
module.exports = router;
