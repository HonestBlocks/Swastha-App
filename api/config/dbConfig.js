let mysql = require('mysql');

require('dotenv').config();


let db = mysql.createConnection({
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT
});

db.connect(err => {
    if(err) {
        console.error(err);
    }
    console.log("mysql connected ...")
});

module.exports = db;