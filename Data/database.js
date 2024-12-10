const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host:"junction.proxy.rlwy.net",
    database:"railway",
    user:'root',
    password:process.env.MYSQLPASSWORD,
    port:13682
})

module.exports = pool