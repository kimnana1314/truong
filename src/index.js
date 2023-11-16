const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const route = require("./routes");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

// HTTP logger
app.use(morgan("combined"));
// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);
dotenv.config();

app.use(express.static(path.join(__dirname, "public")));
app.use("/sanpham", express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.set("view options", { layout: "main-auth" });

app.use(cookieParser());

route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:` + process.env.PORT);
});
