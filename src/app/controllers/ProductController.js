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
class ProductController {
    // Get /news
    show(req, res, next) {
        db.get_Item_User(req.params.Item_Id)
            .then((Items) => {
                res.render("product", { Items });
            })
            .catch(next);
    }
    Post_love(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }
        db.PostUser_Love(User_Id, req.params.Item_Id, req.body.Love)
            .then((Items) => {
                res.send(Items);
            })
            .catch(next);
    }

    PutUser_AddCard(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        db.PostUser_AddCard(User_Id, req.params.Item_Id)
            .then((Items) => {
                res.send(Items);
            })
            .catch(next);
    }
}

module.exports = new ProductController();
