const express = require('express');
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
const path=require('path');
const port =3000;
require('dotenv').config();
const db=require('./config/mongoose');

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//uses express router
app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(session({
    name:'BookShelf',
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes/index.js'));
app.listen(port,function(err){
    if(err) console.log(`Error in running the server: ${err}`);

    else console.log(`Server is up and running on port ${port}`);
})