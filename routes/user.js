const express=require('express')
const router=express.Router();
const userController=require("../controller/user_controller");

router.get('/profile',userController.showProfile)
router.get('/edit',userController.editProfile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.createUser);
router.post('/create-session',userController.createSession);
router.post('/sign-out',userController.signOutUser);
module.exports=router;