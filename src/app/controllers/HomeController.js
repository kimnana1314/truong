const db = require("../models/Db");

class HomeController {
    // Get /news
    home(req, res, next) {
        db.getItemUser()
            .then((Items) => {
                res.render("home", {
                    Items: Items[0],
                    Card: Items[1],
                    // layout: "main-logined",
                });
            })
            .catch(next);
    }
}

module.exports = new HomeController();
