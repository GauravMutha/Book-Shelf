const path = require('path');
const fs=require('fs');

module.exports.deleteUserBooks=function(bookFile,callback){
    const filePath = path.join(__dirname, '..', 'user_uploads', 'books', bookFile);
    fs.access(filePath, fs.constants.F_OK,function(err){
        if (err) return res.status(500).send('Internal server error in finding the book');
        fs.unlink(filePath,function(err){
            if(err){
                console.log(err,'Error in deleting the book')
                return callback(err);
            }
            return callback(null);
        })
    })
}