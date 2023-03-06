const userAuth=require('../models/userAuth');

module.exports.showProfile=function(req,res){
    if(req.cookies.user_id){
        userAuth.findById(req.cookies.user_id,function(err,userFound){
            if(err) {console.log(err,'Error in searching for user'); return;}
            if(userFound){
                return res.render('user_profile',{
                    title:'USER PROFILE',
                    user:userFound
                })
            }
            else {return res.redirect('/user/sign-in');}
        })
    }
    else return res.redirect('/user/sign-in');
}

module.exports.editProfile=function(req,res){
    res.send('<h1>Edit user profile</h1>')
}

module.exports.signup=function(req,res){
    res.render('user_sign_up',{
        title:'Bookshelf Sign Up!'
    })
}

module.exports.signin=function(req,res){
    res.render('user_sign_in',{
        title:'Bookshelf Sign In!'
    })
}

module.exports.createUser=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    userAuth.findOne({email:req.body.email},function(err,foundUser){
        if(err)  {console.log('Error in searching operation in database for sign up request'); return;}
        if(!foundUser){
            userAuth.create(req.body,function(err){
                if(err)  {console.log('Error in creating user in database for sign up'); return;}

                return res.redirect('/user/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession=function(req,res){
    userAuth.findOne({email:req.body.email},function(err,userFound){
        if(err)  {console.log('Error in searching operation in database for sign up request'); return;}

        if(userFound){
            if(userFound.password!= req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',userFound.id);
            return res.redirect('/user/profile');
        }
        else return res.redirect('back');
    })
}