const express = require("express");
const router = express.Router();
const dangnhapController = require("../app/controllers/DangnhapController");
router.get("/dangnhap", dangnhapController.login);

module.exports = router;
