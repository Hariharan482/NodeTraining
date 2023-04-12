let express=require('express');
let router=express.Router();
let control=require('../controllers/controller');

router.post("/register",control.register);
router.post("/login",control.login);

module.exports={
    router,
}