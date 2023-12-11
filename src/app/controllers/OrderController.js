const db = require("../models/Db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// const verifyToken = (token) => {
//     let key = process.env.TOKEN_SECRET;
//     let data = null;
//     try {
//         data = jwt.verify(token, key);
//     } catch (er) {
//         console.log(er);
//     }
//     return data;
// };
class OrderController {
    show(req, res, next) {
        const herder = req.header("header1");
        db.getOrderFind(herder)
            .then((Items) => {
                return res.status(200).json({ Items });
            })
            .catch(next);
    }

    order(req, res, next) {
        let SQL_Json = JSON.stringify(req.body).replace(/\\/g, "");
        console.log("--------------");
        console.log(SQL_Json.substring(2, SQL_Json.length - 5));
        console.log("--------------");
        db.PostOrder(SQL_Json.substring(2, SQL_Json.length - 5))
            .then((Items) => {
                res.send(Items);
            })
            .catch(next);
    }
}

module.exports = new OrderController();
