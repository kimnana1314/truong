const db = require("../models/Db");

class CnController {
    show(req, res, next) {
        db.getBranch()
            .then((Items) => {
                res.render("cn", {
                    Items: Items[0],

                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    ViewEdit(req, res, next) {
        db.getBranchFind(req.params.Br_Id)
            .then((Items) => {
                res.render("cn-edit", {
                    Items: Items[0],

                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    newShow(req, res, next) {
        res.render("cn-new", {
            layout: "main-logined",
        });
    }

    async Update(req, res, next) {
        const Branch = {
            Br_Name: req.body.Br_Name,
            Br_Adress: req.body.Br_Adress,
            Br_Phone: req.body.Br_Phone,
            Br_Id: req.params.Br_Id,
        };
        let SQL_string = '{ "Branch":' + JSON.stringify(Branch) + "}";
        await db
            .BarchNew(SQL_string, 1)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }

    async Delete(req, res, next) {
        const Branch = {
            Br_Id: req.params.Br_Id,
        };
        let SQL_string = '{ "Branch":' + JSON.stringify(Branch) + "}";
        await db
            .BarchNew(SQL_string, 2)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }

    async New(req, res, next) {
        const Branch = {
            Br_Name: req.body.Br_Name,
            Br_Adress: req.body.Br_Adress,
            Br_Phone: req.body.Br_Phone,
        };
        let SQL_string = '{ "Branch":' + JSON.stringify(Branch) + "}";
        await db
            .BarchNew(SQL_string, 0)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }
}

module.exports = new CnController();
