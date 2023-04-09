let express=require('express');
let router=express.Router();

let control=require('../controllers/controllers');

router.post("/",control.addControl);

router.delete("/:id",control.delControl);

router.get("/",control.getAllControl);
router.get("/:id",control.getIdControl);

router.put("/",control.updateControl);
router.put("/:id",control.updateControl);

module.exports={
    router,
}