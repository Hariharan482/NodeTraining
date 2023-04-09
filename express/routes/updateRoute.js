let express=require('express');
let router=express.Router();

let updateControl=require('../controllers/updateControl');
router.put("/:id",updateControl.updateControl);

module.exports={
    router,
}