const db = require("../models/Db");

class BranchController {
    show(req, res, next) {
        db.getBranch()
            .then((Items) => {
                res.render("branch", {
                    Items: Items[0],

                    // layout: "main-logined",
                });
            })
            .catch(next);
    }
}

module.exports = new BranchController();
