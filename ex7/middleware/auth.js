require('dotenv').config();
let logger=require('../logger').logger;
const jwt=require('jsonwebtoken');

let verifyToken=(req,res,next)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(req.headers.authorization){
            token = (req.headers.authorization).split(' ')[1];
            decoded = jwt.verify(token, process.env.JWTSECRETKEY);
            req.user = decoded.username;
            // res.send("token verified");
        }
        else{
            res.status(400);
            throw("token not found");
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    return next();
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}
module.exports={
    verifyToken,
}