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

module.exports=router;