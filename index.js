const express = require('express');
const app=express();
const port =3000;

//uses express router
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err) console.log(`Error in running the server: ${err}`);

    else console.log('Server is up and running on port ${port}');
})