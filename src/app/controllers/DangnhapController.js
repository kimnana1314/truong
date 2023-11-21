const db = require("../models/Db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class DangnhapController {
    // Get /news
    show(req, res) {
        res.render("dangnhap", { layout: "main-auth" });
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
    async login(req, res, next) {
        const User_Email = req.body.User_Email;

        await db
            .UserLogin(User_Email)
            .then((User) => {
                return bcrypt
                    .compare(req.body.User_Password, User.User_Password)
                    .then((res_pass) => {
                        return {
                            Mess: User.Mess,
                            Id: User.Id,
                            Ref: User.Ref,
                            Pass: res_pass,
                        };
                    });
            })
            .then((data) => {
                if (data.Mess.length == 0 && data.Pass) {
                    const token = jwt.sign(
                        { Id: data.Id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: 60 * 60 * 24 }
                    );
                    res.cookie("token", token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 4000,
                    });
                    res.send(data);
                } else {
                    res.send(data);
                }
            })
            .catch(next);
    }
}

module.exports = new DangnhapController();
