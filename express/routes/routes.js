let express=require('express');
let router=express.Router();

let control=require('../controllers/controller');

router.post("/",control.addControl);

router.delete("/:id",control.delControl);

router.get("/",control.getAll);
router.get("/:id",control.getById);

router.put("/",control.updateControl);
router.put("/:id",control.updateControl);

module.exports={
    router,
}