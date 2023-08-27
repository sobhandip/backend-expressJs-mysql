const express = require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const con=require('./dbConfig/index');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/api',require('./routes/userRoutes'))


app.listen(4000,()=>{
    console.log(`Server is running on port 4000`);
})