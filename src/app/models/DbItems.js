const config = require("../../config/db");
const sql = require("mssql");

async function getItems() {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool.request().execute("sp_view_items");
        return Items.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getItem(Item_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("@Item_Id", sql.VarChar, Item_Id)
            .execute("sp_view_items_find");
        return Items;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getItems: getItems,
    getItem: getItem,
};
