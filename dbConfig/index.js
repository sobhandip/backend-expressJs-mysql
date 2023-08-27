const mysql = require("mysql");

console.log(process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE)
const con=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

con.connect((err)=>{
    if(!err){
        console.log(`Database Connected`);
    }else{
        throw Error('Database not connected '+ err)
    }
})

const executeQuery=function(sqlQuery){
    return new Promise((resolve,reject)=>{
        con.query(sqlQuery,function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}


module.exports={
    con,
    executeQuery
}