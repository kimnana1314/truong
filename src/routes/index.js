const homeRouter = require("./home");
const registerRouter = require("./register");
const activeRouter = require("./active");
const loginRouter = require("./login");
const manageRouter = require("./manage");
const productRouter = require("./product");
const addCardRouter = require("./addCard");
const userRouter = require("./user");
const exitsRouter = require("./exits");
const resetpasswordRouter = require("./resetpassword");
const changepasswordRouter = require("./changepassword");
const branchdRouter = require("./branch");
const cnRouter = require("./cn");
const orderRouter = require("./order");
const orderAllRouter = require("./orderAll");
const companyRouter = require("./company");
const favoriteProductRouter = require("./favoriteProduct");
const productsRouter = require("./products");
const middlewares = require("../app/models/middlewares");

function route(app) {
    app.use("/user", middlewares, userRouter);
    app.use("/changepassword", middlewares, changepasswordRouter);
    app.use("/manage", middlewares, manageRouter);
    app.use("/orderAll", middlewares, orderAllRouter);
    app.use("/favorite-product", middlewares, favoriteProductRouter);
    app.use("/register", middlewares, registerRouter);
    app.use("/company", middlewares, companyRouter);
    app.use("/cn", middlewares, cnRouter);
    app.use("/products", middlewares, productsRouter);
    app.use("/active", activeRouter);
    app.use("/log-in", loginRouter);

    app.use("/product", productRouter);
    app.use("/addcard", addCardRouter);
    app.use("/reset-password", resetpasswordRouter);
    app.use("/exit", exitsRouter);
    app.use("/branch", branchdRouter);

    app.use("/order", orderRouter);

    app.use("/", homeRouter);
}

module.exports = route;
