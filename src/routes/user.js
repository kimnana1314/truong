const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const upload = require("../app/models/uploadMiddleware");
const Resize = require("../app/models/Resize");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("../app/models/Db");
require("dotenv").config();

const verifyToken = (token) => {
    let key = process.env.TOKEN_SECRET;
    let data = null;
    try {
        data = jwt.verify(token, key);
    } catch (er) {
        console.log(er);
    }
    return data;
};

router.post("/post", upload.single("avrtar__image"), async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, "../public/img/auth");
    // call class Resize
    const fileUpload = new Resize(imagePath);
    const cookies = req.cookies;
    let User_Id = null;
    let decoded = verifyToken(cookies.token);
    if (decoded) {
        User_Id = decoded.Id;
    }

    if (!req.file) {
        return res.redirect("/user");
    }

    console.log("---------------------");
    console.log("---------------------", req.file);
    console.log("---------------------");

    let img = req.file.originalname.split(".");
    let img_file = img[img.length - 1];

    const filename = await fileUpload.save(req.file.buffer, User_Id, img_file);

    db.UserAvartaUpdate(User_Id, filename).then((Items) => {});

    return res.redirect("/user");
});
router.get("/", userController.show);
router.post("/", userController.update);
module.exports = router;
