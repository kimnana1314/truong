const express = require("express");
const router = express.Router();
const addCardController = require("../app/controllers/AddCardController");
router.post("/", addCardController.PutUser_AddCard);

module.exports = router;
