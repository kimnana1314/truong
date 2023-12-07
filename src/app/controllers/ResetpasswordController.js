const db = require("../models/Db");
const bcrypt = require("bcrypt");
const generatePassword = () => {
    let characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return password;
};

class ResetpasswordController {
    // Get /news
    show(req, res, next) {
        res.render("reset-password", { layout: "main-logined" });
    }

    async resetPassword(req, res, next) {
        const salt = await bcrypt.genSalt(10);
        let pass = generatePassword();
        const hashPassword = await bcrypt.hash(pass, salt);
        const User = {
            User_Email: req.body.User_Email,
            User_Password: hashPassword,
        };
        let SQL_string = '{ "User":' + JSON.stringify(User) + "}";
        await db
            .UserResetPassword(SQL_string)
            .then((User) => {
                if (User.Mess.length == 0) {
                    db.MailRestPass(User.Email, User.Id, pass);
                }
                res.send(User);
            })
            .catch(next);
    }
}

module.exports = new ResetpasswordController();
