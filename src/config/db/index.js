const sql = require("mssql");
const dbConfig = {
    user: "Tr_App",
    password: "TrGGGGHd1314@",
    server: "103.101.161.215",
    database: "App_Truong",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: 1433,
};

async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(dbConfig);
        console.dir("thành công");
    } catch (err) {
        console.dir(err);
    }
}

module.exports = { connect };
