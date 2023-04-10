const { userCollection,bookCollection } = require('../models/userCollection');
const path=require('path');
const fs=require('fs')

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
      if(req.file){
        const allowedTypes = ['application/pdf', 'application/epub+zip'];
        foundUser.bookSchema.push({
          bookFile: req.file.filename,
          name: req.body.name,
          author: req.body.author,
          edition: req.body.edition,
          genre: req.body.genre,
          readList: req.body.readList,
        });
      }
      
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
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    res.sendFile(filePath)
}
module.exports.deleteBook=function(req,res){
    const bookID=req.params.id;
    const userID=req.user._id;
    const fileName=decodeURIComponent(req.params.bookFile);
    const filePath=path.join(__dirname, '..', 'user_uploads', 'books', fileName);
    userCollection.findById(userID,function(err,foundUser){
      if(err){
        console.log('Error',err);
        return res.status(500).send('Internal server error in finding the user');
      }
      if(!foundUser) {
        console.log('Error',err); 
        return res.status(404).send('User not found');
      }
      fs.access(filePath,fs.constants.F_OK,function(err){
        if(err) return res.status(500).send('Internal server error in finding the book');
        foundUser.bookSchema.id(bookID).remove();
        foundUser.save(function(err){
          if(err) return res.status(500).send('Inetrnal sevrer error in deleting the book');
          fs.unlink(filePath,function(err){
              if(err) return res.status(500).send('Inetrnal sevrer error in deleting the book');
              return res.redirect('back'); 
          });
        })
      })
    })
}

module.exports.showBooks=function(req,res){
  userCollection.aggregate([
    { $match: { _id: req.user._id } }, // Match the parent document by _id
    { $project: { filteredBooks: { $filter: { input: '$bookSchema', as: 'book', cond: { $eq: ['$$book.readList', true] } } } } }
  ], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (result.length === 0) {
      console.log('Parent not found');
      return;
    }
    
    // Access the filteredBooks array in the result
    const filteredBooks = result[0].filteredBooks;
    return res.render('book_list',{readListBooks:filteredBooks}) // Log the filtered array elements
  });
}

module.exports.updateReadList=function(req,res){
  const foundUser=req.user;
  const bookID=decodeURIComponent(req.body.bookID);
  const ticked=req.body.ticked;
  // console.log(bookID,ticked)
  const book = foundUser.bookSchema.id(bookID);
  if (!book) {
    console.log('Book not found');
    return res.redirect('back');
  }
  book.readList=ticked;
  foundUser.save(function(err){
    if(err){
      console.log(err);
      return res.status(500).send('Error in marking the book for read list');
    }
    return res.redirect('back');
  })
}