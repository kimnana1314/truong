const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const port = process.env.PORT;

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
        helpers: {
            sumAmt: (a) => a[0].Total_Amt,
        },
    })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/user/post", express.static(path.join(__dirname, "public")));
app.use("/product", express.static(path.join(__dirname, "public")));
app.use("/order", express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.set("view options", { layout: "main-auth" });

app.use(cookieParser());

route(app);

// const options = {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert"),
// };

var privateKey = fs.readFileSync("server.key", "utf8");
var certificate = fs.readFileSync("server.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };

https.createServer(credentials, app).listen(port, function (req, res) {
    console.log("Server started at port :", port);
});

// console.log("---------------------");
// console.log(options);
// console.log("---------------------");
// https.createServer(options, app).listen(port, function (req, res) {
//     console.log("Server started at port :", port);
// });

// app.listen(port, () => {
//     console.log(`App listening on port http://localhost:` + process.env.PORT);
// });
