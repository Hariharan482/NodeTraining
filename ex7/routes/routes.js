let express=require('express');
let router=express.Router();

let control=require('../controllers/controller');

router.post("/",control.create);

router.delete("/:id",control.deleteTask);

router.get("/:id",control.readTaskById);
router.get("/",control.readAll);

router.put("/:id",control.update);

module.exports={
    router,
}