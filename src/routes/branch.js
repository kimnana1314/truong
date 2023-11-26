const express = require("express");
const router = express.Router();
const branchController = require("../app/controllers/BranchController");

router.get("/", branchController.show);
module.exports = router;
