const express = require("express");
const router = express.Router();
const productsController = require("../app/controllers/ProductsController");
const multer = require("multer");
const path = require("path");
const db = require("../app/models/Db");

// Set up multer storage and upload configuration
var idx_ = "";
var Files_Img = {
    Item_Id: "",
    Img: "",
    Img1: "",
    Img2: "",
    Img3: "",
};
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            file.fieldname === "Img" ||
            file.fieldname === "Img1" ||
            file.fieldname === "Img2" ||
            file.fieldname === "Img3"
        ) {
            switch (file.fieldname) {
                case "Img":
                    idx_ = "";
                    break;
                case "Img1":
                    idx_ = "_1";
                    break;
                case "Img2":
                    idx_ = "_2";
                    break;
                case "Img3":
                    idx_ = "_3";
                    break;
            }

            cb(null, path.join(__dirname, "../public/img/proceduct"));
        } else {
            cb(new Error("Invalid field name"));
        }
    },
    filename: (req, file, cb) => {
        let file_name = file.originalname.split(".");
        let i;
        let file_names =
            req.params.Item_Id + idx_ + "." + file_name[file_name.length - 1];
        Files_Img.Item_Id = req.params.Item_Id;
        switch (file.fieldname) {
            case "Img":
                Files_Img.Img = file_names;
                break;
            case "Img1":
                Files_Img.Img1 = file_names;
                break;
            case "Img2":
                Files_Img.Img2 = file_names;
                break;
            case "Img3":
                Files_Img.Img3 = file_names;
                break;
        }

        cb(
            null,

            file_names
        );
    },
});
const uploadd = multer({ storage: storage1 });
const cpUpload = uploadd.fields([
    { name: "Img", maxCount: 1 },
    { name: "Img1", maxCount: 1 },
    { name: "Img2", maxCount: 1 },
    { name: "Img3", maxCount: 1 },
]);

router.get("/New", productsController.newShow);
router.post("/New", productsController.New);
router.get("/:Item_Id/Edit", productsController.ViewEdit);
router.post("/:Item_Id/Edit", productsController.Update);
router.delete("/:Item_Id", productsController.Delete);
router.post("/:Item_Id", cpUpload, (req, res) => {
    const ITEMS = {
        Item_Id: Files_Img.Item_Id,
        Img: Files_Img.Img,
        Img1: Files_Img.Img1,
        Img2: Files_Img.Img2,
        Img3: Files_Img.Img3,
    };
    let SQL_string = '{ "ITEMS":' + JSON.stringify(ITEMS) + "}";
    db.Item_UpdateImg(SQL_string).then((User) => {
        Files_Img.Item_Id = "";
        Files_Img.Img = "";
        Files_Img.Img1 = "";
        Files_Img.Img2 = "";
        Files_Img.Img3 = "";
    });
    return res.redirect("/products");
});
router.get("/", productsController.show);
module.exports = router;
