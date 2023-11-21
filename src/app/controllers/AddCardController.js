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
class AddCardController {
    PutUser_AddCard(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        db.PostUser_AddCard(User_Id, req.body.Item_Id)
            .then((Items) => {
                res.send(Items);
            })
            .catch(next);
    }
}

module.exports = new AddCardController();
