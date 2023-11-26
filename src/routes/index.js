const homeRouter = require("./home");
const dangnhapRouter = require("./dangnhap");
const activeRouter = require("./active");
const dangkyRouter = require("./dangky");
const sanphamRouter = require("./sanpham");
const addCardRouter = require("./addCard");
const nguoidungRouter = require("./nguoidung");
const exitsRouter = require("./exits");
const resetpasswordRouter = require("./resetpassword");
const changepasswordRouter = require("./changepassword");
const branchdRouter = require("./branch");
const orderRouter = require("./order");
const orderAllRouter = require("./orderAll");
const favoriteProductRouter = require("./favoriteProduct");
const middlewares = require("../app/models/middlewares");

function route(app) {
    app.use("/nguoidung", middlewares, nguoidungRouter);
    app.use("/changepassword", middlewares, changepasswordRouter);
    app.use("/dangky", dangkyRouter);
    app.use("/xacthuc", activeRouter);
    app.use("/dangnhap", dangnhapRouter);
    app.use("/sanpham", sanphamRouter);
    app.use("/addcard", addCardRouter);
    app.use("/reset-password", resetpasswordRouter);
    app.use("/exit", exitsRouter);
    app.use("/branch", branchdRouter);
    app.use("/favorite-product", middlewares, favoriteProductRouter);
    app.use("/order", middlewares, orderRouter);
    app.use("/orderAll", middlewares, orderAllRouter);
    app.use("/", homeRouter);
}

module.exports = route;
