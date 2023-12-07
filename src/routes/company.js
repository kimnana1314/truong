const express = require("express");
const router = express.Router();
const companyController = require("../app/controllers/CompanyController");

router.get("/", companyController.show);
router.post("/", companyController.update);

module.exports = router;
