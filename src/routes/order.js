const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");
router.get("/:Tran_Num", orderController.show);
router.post("/:Tran_Num", orderController.order);
// router.get("/", orderController.showAll);

module.exports = router;
