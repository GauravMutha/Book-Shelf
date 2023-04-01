const { userCollection,bookCollection } = require('../models/userCollection');
const path=require('path');

module.exports.showProfile=function(req,res){
    res.render('user_profile');
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_sign_up',{
        title:'Bookshelf Sign Up!'
    })
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_sign_in',{
        title:'Bookshelf Sign In!'
    })
}

module.exports.createUser=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    userCollection.findOne({email:req.body.email},function(err,foundUser){
        if(err)  {console.log('Error in searching operation in database for sign up request'); return;}
        if(!foundUser){
            userCollection.create(req.body,function(err){
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
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

module.exports.showBookForm=function(req,res){
    return res.render('book_form');
}


module.exports.uploadBook = function(req, res) {
  const userID=req.user._id;
  userCollection.findById(userID, (err, foundUser) => {
    if (err) {
      console.log('Error finding user', err);
      return res.status(500).send('Internal server error');
    }
    if (!foundUser) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }
    bookCollection.upload(req, res, function (err) {
      if (err) {
        console.log('Error uploading file', err);
        return res.status(500).send('Internal server error');
      }
      foundUser.bookSchema.push({
        bookFile: req.file.filename,
        name: req.body.name,
        author: req.body.author,
        edition: req.body.edition,
        genre: req.body.genre,
        isStarred: req.body.isStarred,
        readList: req.body.readList,
      });
      
      foundUser.save((err) => {
        if (err) {
          console.log('Error saving book to user', err);
          return res.status(500).send('Internal server error');
        }
        return res.redirect('/user/profile');
      });
    });
  });
};

module.exports.showBook=function(req,res){
    const fileName=req.params.id;
    const filePath=path.join(__dirname, '..', 'user_uploads', 'books', fileName);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=`${fileName}');
    res.sendFile(filePath)
}