let express=require('express');
let router=express.Router();

let addControl=require('../controllers/addControl');
router.post("/",addControl.addControl);

module.exports={
    router,
}