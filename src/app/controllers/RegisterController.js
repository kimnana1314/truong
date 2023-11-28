const db = require("../models/Db");
const bcrypt = require("bcrypt");
class RegisterController {
    // Get /news
    register(req, res, next) {
        res.render("register", { layout: "main-auth" });
    }

    async store(req, res, next) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.User_Password, salt);
        const User = {
            User_Email: req.body.User_Email,
            User_Password: hashPassword,
        };
        let SQL_string = '{ "User":' + JSON.stringify(User) + "}";
        await db
            .UserRegister(SQL_string)
            .then((User) => {
                if (User.Mess.length == 0) {
                    db.send_Mail(User.Email, User.Id, User.Ref);
                }
                res.send(User);
            })
            .catch(next);
    }
}

module.exports = new RegisterController();
