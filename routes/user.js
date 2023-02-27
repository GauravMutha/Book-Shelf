const express=require('express')
const router=express.Router();
const userController=require("../controller/user_controller");

router.get('/',userController.showProfile)
router.get('/edit',userController.editProfile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)

module.exports=router;