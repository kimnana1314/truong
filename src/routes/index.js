const homeRouter = require("./home");
const dangnhapRouter = require("./dangnhap");
const activeRouter = require("./active");
const dangkyRouter = require("./dangky");
const sanphamRouter = require("./sanpham");
const addCardRouter = require("./addCard");
const nguoidungRouter = require("./nguoidung");
const exitsRouter = require("./exits");
const middlewares = require("../app/models/middlewares");

function route(app) {
    app.use("/nguoidung", middlewares, nguoidungRouter);
    app.use("/dangky", dangkyRouter);
    app.use("/xacthuc", activeRouter);
    app.use("/dangnhap", dangnhapRouter);
    app.use("/sanpham", sanphamRouter);
    app.use("/addcard", addCardRouter);
    app.use("/exit", exitsRouter);
    app.use("/", homeRouter);
}

module.exports = route;
