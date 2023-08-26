const express = require('express');
const bodyParser=require('body-parser');
const {dbConn}=require('./dbConfig/index')

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

dbConn.connect((err)=>{
    if(!err){
        console.log(`Database Connected`);
    }else{
        throw Error('Database not connected '+ err)
    }
})


app.listen(4000,()=>{
    console.log(`Server is running on port 4000`);
})