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
class FavoriteProductController {
    show(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        if (User_Id) {
            db.FavoriteProduct(User_Id)
                .then((Items) => {
                    res.render("favorite-product", {
                        Items: Items[0],
                        Card: Items[1],
                        layout: "main-logined",
                    });
                })
                .catch(next);
        }
    }
}

module.exports = new FavoriteProductController();
