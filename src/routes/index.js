const homeRouter = require("./home");
const dangnhapRouter = require("./dangnhap");
const activeRouter = require("./active");
const dangkyRouter = require("./dangky");
const sanphamRouter = require("./sanpham");

const middlewares = require("../app/models/middlewares");

// const checkUserLogin= (req,res,next) => {
//   const nonSecurePaths=['/','/dangky','/xacthuc','/dangnhap'];
//   if (nonSecurePaths.includes(req.path)) return next();
//   if (user) {
//     next();
//   }else {

//   }
// }

function route(app) {
    app.use("/dangky", dangkyRouter);
    app.use("/xacthuc", activeRouter);
    app.use("/dangnhap", dangnhapRouter);
    app.use("/sanpham", middlewares, sanphamRouter);
    app.use("/", homeRouter);
}

module.exports = route;
