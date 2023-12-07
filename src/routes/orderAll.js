const express = require("express");
const router = express.Router();
const orderAllController = require("../app/controllers/OrderAllController");

router.get("/:Tran_Num/view", orderAllController.view);
router.put("/:Tran_Num/delivery", orderAllController.delivery);
router.put("/:Tran_Num/success", orderAllController.success);
router.put("/:Tran_Num/Delete", orderAllController.Delete);
router.put("/:Tran_Num/Recover", orderAllController.Recover);
router.get("/", orderAllController.show);
module.exports = router;
