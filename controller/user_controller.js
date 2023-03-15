const userAuth=require('../models/userAuth');

module.exports.showProfile=function(req,res){
    res.render('user_profile');
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
    return res.redirect('/user/profile');
}