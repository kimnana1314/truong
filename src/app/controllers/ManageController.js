const db = require("../models/Db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class ManageController {
    // Get /news
    show(req, res) {
        res.render("manage", { layout: "main-auth" });
    }

    // Post check login
    next() {
        var uses = {
            Mess: "Đăng nhập thất bại",
            Ref: "",
            Id: "",
        };
        res.send("");
    }
}

module.exports = new ManageController();
