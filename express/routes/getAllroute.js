let express=require('express');
let router=express.Router();

let getAllControl=require('../controllers/getAllControl');
let getAllCtrlByID=require('../controllers/getAllByIdCtrl');

router.get("/",getAllControl.getAll);

router.get("/:id",getAllCtrlByID.getById);

module.exports={
    router,
}