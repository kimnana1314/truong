const db = require("../models/Db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

class ExitsController {
    // Post check login
    next() {
        var uses = {
            Mess: "Đăng nhập thất bại",
            Ref: "",
            Id: "",
        };
        res.send("");
    }
    async exits(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;

            res.clearCookie("token");

            res.end();
        }
    }
}

module.exports = new ExitsController();
