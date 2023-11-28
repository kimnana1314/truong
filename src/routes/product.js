const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");
router.get("/:Item_Id", productController.show);
router.post("/:Item_Id", productController.Post_love);
router.put("/:Item_Id", productController.PutUser_AddCard);
router.get("/", productController.show);
module.exports = router;
