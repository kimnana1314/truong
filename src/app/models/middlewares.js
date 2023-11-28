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
module.exports = (req, res, next) => {
    const cookies = req.cookies;
    if (cookies && cookies.token) {
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            next();
        } else {
            res.redirect("/log-in");
        }
    } else {
        res.redirect("/log-in");
    }
};
