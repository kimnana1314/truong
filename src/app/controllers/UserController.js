const db = require("../models/Db");
const jwt = require("jsonwebtoken");
const Resize = require("../models/Resize");

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
class UserController {
    // Get /news
    show(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        db.getprofile_user(User_Id)
            .then((Items) => {
                res.render("user", {
                    Items: Items[0],
                    Card: Items[1],
                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    update(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        if (User_Id) {
            db.Postprofile_user(
                User_Id,
                req.body.User_FullName,
                req.body.User_Address,
                req.body.User_Phone
            )
                .then((Items) => {
                    res.send(Items);
                })
                .catch(next);
        }
    }

    async post(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        if (User_Id) {
            // folder upload
            const imagePath = "./img/auth";
            console.log("---------------------------");
            console.log(
                "---------------------------",
                JSON.stringify(req.body.image)
            );
            console.log("---------------------------");

            // upload.single("image");
            // call class Resize

            const fileUpload = new Resize(imagePath);
            if (!req.body.image) {
                res.status(401).json({
                    error: "Lỗi upload file ảnh",
                    avarta: "",
                });
            }
            const filename = await fileUpload.save(
                req.body.image.buffer,
                "avartar_1"
            );

            return res.status(200).json({ error: "", avarta: filename });
        }
    }
}

module.exports = new UserController();
