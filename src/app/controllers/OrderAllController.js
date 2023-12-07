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
class OrderAllController {
    show(req, res, next) {
        let Status;
        let Dk;
        let Seach;
        if (req.query.Select_Status) {
            Status = req.query.Select_Status;
        } else {
            Status = "0";
        }

        if (req.query.Select_Seach) {
            Dk = req.query.Select_Seach;
        } else {
            Dk = "0";
        }

        if (req.query.input_seach) {
            Seach = req.query.input_seach;
        } else {
            Seach = "";
        }

        db.getOrderAllFind(Status, Dk, Seach)
            .then((Items) => {
                res.render("orderAll", {
                    Items: Items[0],
                    Card: Items[1],
                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    view(req, res, next) {
        let Tran_Num;
        if (req.params.Tran_Num) {
            Tran_Num = req.params.Tran_Num;
        } else {
            Tran_Num = "";
        }

        db.getOrderViews(Tran_Num)
            .then((Items) => {
                res.render("order-view", {
                    Items: Items[0],
                    Trans: Items[1],
                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    async delivery(req, res, next) {
        let Tran_Num;
        if (req.params.Tran_Num) {
            Tran_Num = req.params.Tran_Num;
        } else {
            Tran_Num = "";
        }

        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        const Tran_Card = {
            Tran_Num: Tran_Num,
            Ascendant: req.body.Ascendant,
            Adress: req.body.Adress,
            Phone: req.body.Phone,
            Deliver: req.body.Deliver,
            Phone_Del: req.body.Phone_Del,
            Remark: req.body.Remark,
            User_Id: User_Id,
        };

        console.log(Tran_Card);
        let SQL_string = '{ "Tran_Card":' + JSON.stringify(Tran_Card) + "}";
        await db
            .Order_Handle(SQL_string, "1")
            .then((order) => {
                res.send(order);
            })
            .catch(next);
    }

    async success(req, res, next) {
        let Tran_Num;
        if (req.params.Tran_Num) {
            Tran_Num = req.params.Tran_Num;
        } else {
            Tran_Num = "";
        }

        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        const Tran_Card = {
            Tran_Num: Tran_Num,
            Ascendant: req.body.Ascendant,
            Adress: req.body.Adress,
            Phone: req.body.Phone,
            Deliver: req.body.Deliver,
            Phone_Del: req.body.Phone_Del,
            Remark: req.body.Remark,
            User_Id: User_Id,
        };
        let SQL_string = '{ "Tran_Card":' + JSON.stringify(Tran_Card) + "}";
        await db
            .Order_Handle(SQL_string, "2")
            .then((order) => {
                res.send(order);
            })
            .catch(next);
    }

    async Delete(req, res, next) {
        let Tran_Num;
        if (req.params.Tran_Num) {
            Tran_Num = req.params.Tran_Num;
        } else {
            Tran_Num = "";
        }

        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        const Tran_Card = {
            Tran_Num: Tran_Num,
            Ascendant: req.body.Ascendant,
            Adress: req.body.Adress,
            Phone: req.body.Phone,
            Deliver: req.body.Deliver,
            Phone_Del: req.body.Phone_Del,
            Remark: req.body.Remark,
            User_Id: User_Id,
        };
        let SQL_string = '{ "Tran_Card":' + JSON.stringify(Tran_Card) + "}";
        await db
            .Order_Handle(SQL_string, "3")
            .then((order) => {
                res.send(order);
            })
            .catch(next);
    }
    async Recover(req, res, next) {
        let Tran_Num;
        if (req.params.Tran_Num) {
            Tran_Num = req.params.Tran_Num;
        } else {
            Tran_Num = "";
        }

        const cookies = req.cookies;
        let User_Id = null;
        let decoded = verifyToken(cookies.token);
        if (decoded) {
            User_Id = decoded.Id;
        }

        const Tran_Card = {
            Tran_Num: Tran_Num,
            Ascendant: req.body.Ascendant,
            Adress: req.body.Adress,
            Phone: req.body.Phone,
            Deliver: req.body.Deliver,
            Phone_Del: req.body.Phone_Del,
            Remark: req.body.Remark,
            User_Id: User_Id,
        };
        let SQL_string = '{ "Tran_Card":' + JSON.stringify(Tran_Card) + "}";
        await db
            .Order_Handle(SQL_string, "0")
            .then((order) => {
                res.send(order);
            })
            .catch(next);
    }
}

module.exports = new OrderAllController();
