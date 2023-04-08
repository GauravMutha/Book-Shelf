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
const MongoStore = require('connect-mongo');

const store = new MongoStore(
    {
        mongoUrl:process.env.MONGO_URL,
        mongooseConnection:db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup OK')
      }
      );
const app=express();
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use('./user_uploads',express.static(__dirname+'user_uploads'));
app.use('/publics', express.static(__dirname + '/publics'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(session({
    name:'BookShelf',
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use('/',require('./routes/index.js'));
app.listen(port,function(err){
    if(err) console.log(`Error in running the server: ${err}`);

    else console.log(`Server is up and running on port ${port}`);
})