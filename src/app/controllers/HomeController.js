const dbItems = require("../models/DbItems");
class HomeController {
    // Get /news
    home(req, res) {
        dbItems.getItems().then((Items) => {
            console.log(Items);
            // res.send({ Items });
            res.render("home", { Items });
        });
    }
}

module.exports = new HomeController();
