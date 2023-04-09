let express=require('express');
let router=express.Router();

//controllers
let control=require('../controllers/controllers');

//add buddy control
router.post("/",control.addControl);
//del buddy control
router.delete("/:id",control.delControl);
// get buddy control
router.get("/",control.getAllControl);
router.get("/:id",control.getIdControl);
//update buddy control
router.put("/",control.updateControl);
router.put("/:id",control.updateControl);

//exporting router
module.exports={
    router,
}