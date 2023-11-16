const dotenv = require("dotenv");
dotenv.config();
const dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: 1433,
};

module.exports = { dbConfig };
