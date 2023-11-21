const db = require("../models/Db");
const jwt = require("jsonwebtoken");
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
class NguoidungController {
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
                res.render("nguoidung", {
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
}

module.exports = new NguoidungController();
