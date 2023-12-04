const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");

router.post("/", orderController.order);
// router.post("/post", orderController.pot_get);
router.get("/", orderController.show);
// router.get("/", orderController.showAll);

module.exports = router;
