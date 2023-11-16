const db = require("../models/Db");
class ActiveController {
    // Get /news

    show(req, res, next) {
        //res.send("Máy lam đá:" + req.query.key);

        res.render("active", { key: req.query.key, layout: "main-auth" });
    }
    active(req, res, next) {
        db.UserActive(req.body.User_Id, req.body.Code)

            .then((User) => {
                res.send(User);
            })
            .catch(next);
    }
}

module.exports = new ActiveController();
