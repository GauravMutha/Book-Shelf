const express=require('express')
const router=express.Router();
const userController=require("../controller/user_controller");

router.get('/',userController.showProfile)
router.get('/edit',userController.editProfile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.createUser);
router.post('/create-session',userController.createSession);

module.exports=router;