const newsRouter = require("./news");
const homeRouter = require("./home");

function route(app) {
    app.use("/news", newsRouter);
}
function route(app) {
    app.use("/", homeRouter);
}

module.exports = route;
