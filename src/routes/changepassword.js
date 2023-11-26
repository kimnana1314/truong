const express = require("express");
const router = express.Router();
const changepasswordController = require("../app/controllers/ChangepasswordController");

router.get("/", changepasswordController.show);
router.post("/", changepasswordController.update);
module.exports = router;
