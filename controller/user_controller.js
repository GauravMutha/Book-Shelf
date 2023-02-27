module.exports.showProfile=function(req,res){
    res.send('<h1>User profile page</h1>');
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
    //later
}

module.exports.createSession=function(req,res){
    //later
}