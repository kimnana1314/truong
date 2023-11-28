const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/RegisterController");

router.get("/", registerController.register);
router.get("/", registerController.register);
router.post("/", registerController.store);

module.exports = router;
