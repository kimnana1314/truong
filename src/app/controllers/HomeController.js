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
class HomeController {
    // Get /news
    home(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }
        console.log("Giá trị ID:", User_Id);
        if (User_Id) {
            console.log("Giá trị ID Tồn tại:", User_Id);
            db.getItemUser(User_Id)
                .then((Items) => {
                    res.render("home", { Items, layout: "main-logined" });
                })
                .catch(next);
        } else {
            console.log("Giá trị ID Không tồn tại:", User_Id);
            db.getItems()
                .then((Items) => {
                    res.render("home", { Items });
                })
                .catch(next);
        }
    }
}

module.exports = new HomeController();
