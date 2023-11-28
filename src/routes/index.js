const homeRouter = require("./home");
const registerRouter = require("./register");
const activeRouter = require("./active");
const loginRouter = require("./login");
const productRouter = require("./product");
const addCardRouter = require("./addCard");
const userRouter = require("./user");
const exitsRouter = require("./exits");
const resetpasswordRouter = require("./resetpassword");
const changepasswordRouter = require("./changepassword");
const branchdRouter = require("./branch");
const orderRouter = require("./order");
const orderAllRouter = require("./orderAll");
const favoriteProductRouter = require("./favoriteProduct");

const middlewares = require("../app/models/middlewares");

function route(app) {
    app.use("/user", middlewares, userRouter);
    app.use("/changepassword", middlewares, changepasswordRouter);
    app.use("/register", registerRouter);
    app.use("/active", activeRouter);
    app.use("/log-in", loginRouter);
    app.use("/product", productRouter);
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
