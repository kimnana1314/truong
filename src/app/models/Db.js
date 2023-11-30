const config = require("../../config/db");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
async function getItems() {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool.request().execute("sp_view_items");
        return Items.recordsets;
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
        return Items.recordsets;
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
async function UserAvartaUpdate(User_Id, User_Avarta) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("User_Avarta", sql.NVarChar, User_Avarta)
            .output("Mess", "")
            .execute("sp_profile_user_update_Avarta");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function UserResetPassword(User_Json) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("json", sql.NVarChar, User_Json)
            .output("Mess", "")
            .output("Email", "")
            .output("Id", "")
            .execute("sp_User_Reset_password");
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
                pass: process.env.EMAIL_PASS,
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
                "/active?key=" +
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

async function PostUser_Love(User_Id, Item_Id, Love) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("Item_Id", sql.VarChar, Item_Id)
            .input("Love", sql.Bit, Love)
            .output("Mess", "")
            .output("Id", "")
            .execute("sp_User_love");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function PostOrder(Json, User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("Json", sql.NVarChar, Json)
            .input("User_Id", sql.VarChar, User_Id)
            .output("Mess", "")
            .output("Id", "")
            .execute("sp_Order_Play");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function PostUser_AddCard(User_Id, Item_Id, Love) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("Item_Id", sql.VarChar, Item_Id)
            .output("Mess", "")
            .output("Id", "")
            .execute("sp_add_card");
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
        return Items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getOrderFind(User_Id, Tran_Num) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("Tran_Num", sql.VarChar, Tran_Num)
            .execute("sp_order_find");
        return Items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getOrderAllFind(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_view_OrderAll");
        return Items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function FavoriteProduct(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_FavoriteProduct");
        return Items.recordsets;
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

async function getprofile_user(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_profile_user");
        return Items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function Postprofile_user(
    User_Id,
    User_FullName,
    User_Address,
    User_Phone
) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("User_FullName", sql.NVarChar, User_FullName)
            .input("User_Address", sql.NVarChar, User_Address)
            .input("User_Phone", sql.NVarChar, User_Phone)
            .output("Mess", "")
            .output("Id", "")
            .execute("sp_Update_profile_user");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function Postprofile_Change_password(User_Id, User_Password) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let User = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .input("User_Password", sql.NVarChar, User_Password)
            .output("Mess", "")
            .output("Id", "")
            .execute("sp_Update_profile_Change_password");
        return User.output;
    } catch (error) {
        console.log(error);
    }
}

async function MailRestPass(Email, Id, pass) {
    try {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "phanmenhdsw@gmail.com",
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        var mailOptions = {
            from: "phanmenhdsw@gmail.com",
            to: Email,
            subject: "ĐẶT LẠI MẬT KHẨU ",
            text:
                "Mật khẩu mới của quý khách là: " +
                pass +
                "  Bấm vào link bên để đăng nhập:  " +
                process.env.WEB_URI +
                "/log-in",
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

async function getBranch() {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool.request().execute("sp_view_Branch");
        return Items.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getBranchUser(User_Id) {
    try {
        let pool = await sql.connect(config.dbConfig);
        let Items = await pool
            .request()
            .input("User_Id", sql.VarChar, User_Id)
            .execute("sp_view_Branch_User");
        return Items.recordsets;
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
    PostUser_Love: PostUser_Love,
    PostUser_AddCard: PostUser_AddCard,
    getprofile_user: getprofile_user,
    Postprofile_user: Postprofile_user,
    UserResetPassword: UserResetPassword,
    MailRestPass: MailRestPass,
    Postprofile_Change_password: Postprofile_Change_password,
    getBranch: getBranch,
    getBranchUser: getBranchUser,
    getOrderFind: getOrderFind,
    PostOrder: PostOrder,
    FavoriteProduct: FavoriteProduct,
    getOrderAllFind: getOrderAllFind,
    UserAvartaUpdate: UserAvartaUpdate,
};
