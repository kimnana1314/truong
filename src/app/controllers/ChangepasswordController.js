const db = require("../models/Db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
class ChangepasswordController {
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
                res.render("changepassword", {
                    Items: Items[0],
                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    async update(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.User_Password, salt);

        if (User_Id) {
            db.Postprofile_Change_password(User_Id, hashPassword)
                .then((Items) => {
                    res.send(Items);
                })
                .catch(next);
        }
    }
}

module.exports = new ChangepasswordController();
