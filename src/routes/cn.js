const express = require("express");
const router = express.Router();
const cnController = require("../app/controllers/CnController");
const upload = require("../app/models/uploadMiddleware");
const resizeBrach = require("../app/models/ResizeBrach");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("../app/models/Db");
require("dotenv").config();

router.get("/New", cnController.newShow);
router.post("/New", cnController.New);
router.get("/:Br_Id/Edit", cnController.ViewEdit);
router.post("/:Br_Id/Edit", cnController.Update);
router.delete("/:Br_Id", cnController.Delete);
router.post("/:Br_Id", upload.single("Br_Img"), async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, "../public/img/brach");
    // call class Resize
    const fileUpload = new resizeBrach(imagePath);

    let User_Id = req.params.Br_Id;

    if (!req.file) {
        return res.redirect("/cn");
    }

    let img = req.file.originalname.split(".");
    let img_file = img[img.length - 1];

    const filename = await fileUpload.save(req.file.buffer, User_Id, img_file);

    db.UserImgBrach(User_Id, filename).then((Items) => {});

    return res.redirect("/cn");
});
router.get("/", cnController.show);
// router.delete("/Del", cnController.delete);
// router.post("/", cnController.update);
module.exports = router;
