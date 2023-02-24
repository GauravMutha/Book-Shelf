const express = require('express');
const path=require('path');
const port =3000;

const db=require('./config/mongoose');

const app=express();

//uses express router
app.use('/',require('./routes/index.js'));
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.listen(port,function(err){
    if(err) console.log(`Error in running the server: ${err}`);

    else console.log(`Server is up and running on port ${port}`);
})