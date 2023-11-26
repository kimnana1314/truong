const express = require("express");
const router = express.Router();
const favoriteProductController = require("../app/controllers/FavoriteProductController");
router.get("/", favoriteProductController.show);

module.exports = router;
