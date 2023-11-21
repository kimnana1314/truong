const express = require("express");
const router = express.Router();
const sanphamController = require("../app/controllers/SanphamController");
router.get("/:Item_Id", sanphamController.show);
router.post("/:Item_Id", sanphamController.Post_love);
router.put("/:Item_Id", sanphamController.PutUser_AddCard);
router.get("/", sanphamController.show);
module.exports = router;
