const mysql = require("mysql");


const dbConn=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Temp1234',
    database: 'onboarding'
})

module.exports={
    dbConn
}