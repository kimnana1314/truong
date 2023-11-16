const config = require("../../config/db");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
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
        return Items.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getItemUser(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_view_items_User");
        return Items.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function UserRegister(User_Json) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("json", sql.NVarChar, User_Json)
            .output("Mess", "")
            .output("Ref", "")
            .output("Email", "")
            .output("Id", "")
            .execute("sp_User_Register");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}
async function UserLogin(User_Email) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Email", sql.NVarChar, User_Email)
            .output("Mess", "")
            .output("Ref", "")
            .output("Id", "")
            .output("User_Password", "")
            .execute("sp_User_Login");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}
async function UserFind(User_Email) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Email", sql.NVarChar, User_Email)
            .output("Ref", "")
            .output("Id", "")
            .execute("sp_User_Find");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function send_Mail(Email, Id, Ref) {
    try {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "phanmenhdsw@gmail.com",
                pass: "coei gdpu ecke iblh",
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        var mailOptions = {
            from: "phanmenhdsw@gmail.com",
            to: Email,
            subject: "XÁC THỰC TÀI KHOẢN",
            text:
                "Mã code kích hoạt tài khoản: " +
                Ref +
                "  Bấm vào link bên để kích hoạt tài khoản:  " +
                process.env.WEB_URI +
                "/xacthuc?key=" +
                Id,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function UserActive(User_Id, Code) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.Int, User_Id)
            .input("Code", sql.VarChar, Code)
            .output("Mess", "")
            .execute("sp_User_Active");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function get_Item_User(User_Id, Item_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("Item_Id", sql.VarChar, Item_Id)
            .execute("sp_Views_find");
        return Items.recordset;
    } catch (error) {
        console.log(error);
    }
}

async function getHeaderLogin(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_HeaderLogin");
        return Items.recordset;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getItems: getItems,
    getItem: getItem,
    UserRegister: UserRegister,
    UserFind: UserFind,
    send_Mail: send_Mail,
    UserActive: UserActive,
    UserLogin: UserLogin,
    getItemUser: getItemUser,
    get_Item_User: get_Item_User,
    getHeaderLogin: getHeaderLogin,
};
