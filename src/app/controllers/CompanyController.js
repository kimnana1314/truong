const db = require("../models/Db");
const bcrypt = require("bcrypt");
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
class CompanyController {
    // Get /news
    async show(req, res, next) {
        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }
        if (User_Id) {
            await db
                .company()
                .then((company) => {
                    res.render("company", {
                        company: company[0],
                        layout: "main-logined",
                    });
                })
                .catch(next);
        }
    }

    async update(req, res, next) {
        const Company = {
            Titel: req.body.Titel,
            Email: req.body.Email,
            Hotline: req.body.Hotline,
            Address: req.body.Address,
        };
        let SQL_string = '{ "Company":' + JSON.stringify(Company) + "}";
        await db
            .Company_Update(SQL_string)
            .then((User) => {
                res.send(User);
            })
            .catch(next);
    }
}

module.exports = new CompanyController();
