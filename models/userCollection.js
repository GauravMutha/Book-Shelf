const mongoose = require('mongoose');
const multer = require('multer')
const path=require('path');
const BOOK_PATH =path.join('/user_uploads/books');
const bookController = require('../controller/bookController');

const bookSchema=new mongoose.Schema({
    bookFile:{type:String},
    name:{type:String,required:true},
    author:{type:String},
    edition:{type:String},
    genre:{type:String , default:'Other'},
    readList:{type:Boolean ,default:false,index:true}
},{
    timestamps:true 
})

const userSchema = new mongoose.Schema({
    email: { type: String, required: true,unique:true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    bookSchema:[bookSchema]
},{
    timestamps:true
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',BOOK_PATH))
    },
    filename: function (req, file, cb) {
      const fileExtension=path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+fileExtension)
    }
  })
  
bookSchema.statics.upload= multer({ storage: storage }).single('bookFile');
bookSchema.statics.bookPath= BOOK_PATH;

userSchema.statics.getReadList= function (callback){
  return this.find({'bookSchema.readList':true},callback);
}
userSchema.pre('deleteOne',function(next){
  const userID = this._conditions._id;
  userCollection.findById(userID,function(err,foundUser){
    if(err){
      console.log(err,'Error in searching for user');
      return next(err);
    }
    if(!foundUser){
      console.log('User not found');
      return next(new Error('User not found'));
    }
    console.log(foundUser)
    foundUser.bookSchema.forEach(function({bookFile}){
      bookController.deleteUserBooks(bookFile,function(err){
        if(err) return next(err);
      })
    })
    next();
  })
})

const userCollection=mongoose.model('userCollection',userSchema);
const bookCollection=mongoose.model('bookCollection',bookSchema);





module.exports = { userCollection, bookCollection };