const express = require("express");
const router = express.Router();
const sanphamController = require("../app/controllers/SanphamController");

router.get("/:Item_Id", sanphamController.show);
router.get("/", sanphamController.show);
module.exports = router;
