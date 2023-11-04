// const dbItems = require("../models/DbItems");
class DangnhapController {
    // Get /news
    login(req, res) {
        res.render("dangnhap");
        // dbItems.getItems().then((Items) => {
        //     console.log(Items);
        //     // res.send({ Items });
        //     res.render("dangnhap", { Items });
        // });
    }
}

module.exports = new DangnhapController();
