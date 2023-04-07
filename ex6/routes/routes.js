let express=require('express');
let router=express.Router();

let control=require('../controllers/controllers');

router.post("/",control.createtask);

router.delete("/:id",control.deleteTask);

router.get("/filter",control.filter);
router.get("/:id",control.readTaskById);
router.get("/",control.readAll);

router.get("/sort",control.sortTask);
router.put("/:id",control.update);

module.exports={
    router,
}