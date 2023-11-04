const homeRouter = require("./home");
const dangnhapRouter = require("./dangnhap");

function route(app) {
    app.use("/dangnhap", dangnhapRouter);
    app.use("/", homeRouter);
}

module.exports = route;
