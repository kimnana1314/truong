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
class ProductsController {
    // Get /news

    newShow(req, res, next) {
        res.render("products-new", {
            layout: "main-logined",
        });
    }

    show(req, res, next) {
        db.getItems()
            .then((Items) => {
                res.render("products", {
                    Items: Items[0],

                    layout: "main-logined",
                });
            })
            .catch(next);
    }
    ViewEdit(req, res, next) {
        db.get_Item_User(req.params.Item_Id)
            .then((Items) => {
                res.render("products-edit", {
                    Items,

                    layout: "main-logined",
                });
            })
            .catch(next);
    }

    async Update(req, res, next) {
        const ITEMS = {
            Item_Id: req.params.Item_Id,
            Item_Name: req.body.Item_Name,
            Price: req.body.Price,
            Size_M: req.body.Size_M,
            Weigth_M: req.body.Weigth_M,
            Size_D: req.body.Size_D,
            Quantity: req.body.Quantity,
            Container_Valume: req.body.Container_Valume,
            Voltage: req.body.Voltage,
            Wattage: req.body.Wattage,
            Cryogenics: req.body.Cryogenics,
            Cooling_Sys: req.body.Cooling_Sys,
            Qty_Batch: req.body.Qty_Batch,
        };
        console.log(ITEMS);
        let SQL_string = '{ "ITEMS":' + JSON.stringify(ITEMS) + "}";
        await db
            .Items_Update(SQL_string, 1)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }

    async Delete(req, res, next) {
        const ITEMS = {
            Item_Id: req.params.Item_Id,
        };
        let SQL_string = '{ "ITEMS":' + JSON.stringify(ITEMS) + "}";
        await db
            .Items_Update(SQL_string, 2)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }

    async New(req, res, next) {
        const ITEMS = {
            Item_Id: req.body.Item_Id,
            Item_Name: req.body.Item_Name,
            Price: req.body.Price,
            Size_M: req.body.Size_M,
            Weigth_M: req.body.Weigth_M,
            Size_D: req.body.Size_D,
            Quantity: req.body.Quantity,
            Container_Valume: req.body.Container_Valume,
            Voltage: req.body.Voltage,
            Wattage: req.body.Wattage,
            Cryogenics: req.body.Cryogenics,
            Cooling_Sys: req.body.Cooling_Sys,
            Qty_Batch: req.body.Qty_Batch,
        };
        let SQL_string = '{ "ITEMS":' + JSON.stringify(ITEMS) + "}";
        await db
            .Items_Update(SQL_string, 0)
            .then((Branch) => {
                res.send(Branch);
            })
            .catch(next);
    }
}

module.exports = new ProductsController();
