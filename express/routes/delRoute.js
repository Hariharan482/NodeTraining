let express=require('express');
let router=express.Router();

let delControl=require('../controllers/delController');
router.delete("/:id",delControl.delControl);

module.exports={
    router,
}