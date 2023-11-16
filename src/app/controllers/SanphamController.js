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
class SanphamController {
    // Get /news
    show(req, res, next) {
        const cookies = req.cookies;
        let User_Id = 0;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        db.get_Item_User(User_Id, req.params.Item_Id)
            .then((Items) => {
                res.render("Sanpham", { Items, layout: "main-logined" });
            })
            .catch(next);
    }
}

module.exports = new SanphamController();
