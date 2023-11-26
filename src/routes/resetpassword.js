const express = require("express");
const router = express.Router();
const resetpasswordController = require("../app/controllers/ResetpasswordController");
router.get("/", resetpasswordController.show);
router.post("/", resetpasswordController.resetPassword);
module.exports = router;
