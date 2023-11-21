const express = require("express");
const router = express.Router();
const nguoidungController = require("../app/controllers/NguoidungController");

router.get("/", nguoidungController.show);
router.post("/", nguoidungController.update);
module.exports = router;
