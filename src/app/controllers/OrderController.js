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
class OrderController {
    show(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        if (User_Id) {
            db.getOrderFind(User_Id, req.params.Tran_Num)
                .then((Items) => {
                    res.render("order", {
                        Items: Items[0],
                        Card: Items[1],
                        layout: "main-logined",
                    });
                })
                .catch(next);
        }
    }

    order(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }
        let SQL_Json = JSON.stringify(req.body).replace(/\\/g, "");
        db.PostOrder(SQL_Json.substring(2, SQL_Json.length - 5), User_Id)
            .then((Items) => {
                res.send(Items);
            })
            .catch(next);
    }
}

module.exports = new OrderController();
