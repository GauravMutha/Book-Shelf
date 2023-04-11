const express=require('express')
const passport=require('passport')
const router=express.Router();
const userController=require("../controller/user_controller");

router.get('/profile',passport.checkAuthentication,userController.showProfile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),userController.createSession);
router.get('/sign-out',userController.destroySession);
router.get('/bookForm',passport.checkAuthentication,userController.showBookForm);
router.post('/book-upload',passport.checkAuthentication,userController.uploadBook);
router.get('/pdf/:id',userController.showBook);
router.get('/pdf/delete-book/:id/:bookFile',userController.deleteBook)
router.get('/books',userController.showBooks)
router.get('/books/rl-books',userController.sendRLBooksToClient)
router.put('/books/update-read-list',userController.updateReadList);
module.exports=router;