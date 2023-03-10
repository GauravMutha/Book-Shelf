const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User=require('../models/userAuth');

passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        User.findOne({email:email},function(err,userFound){
            if(err){
                console.log(err,'Error in searching for user-->Passport')
                return done(err);
            }
            if(!userFound || userFound.password!=password){
                return done(null,false);
            }

            return done(null,userFound);
        })
    }
));

//serialize the user
passport.serializeUser(function(userFound,done){
    done(null,userFound.id)
})

//deserialize the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,userFound){
        if(err){
            console.log(err,'Error in searching for user-->Passport')
            return done(err);
        }

        return done(null,userFound);
    })
}) 