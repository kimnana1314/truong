const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const upload = require("../app/models/uploadMiddleware");

router.post("/post", upload.single("image"), userController.post);
router.get("/", userController.show);
router.post("/", userController.update);
module.exports = router;
