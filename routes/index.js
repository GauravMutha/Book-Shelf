const express=require('express');
const router=express.Router();
const homeController=require("../controller/home_controller");

console.log('Router has been loaded');
router.get('/',homeController.home);

module.exports = router;