const logger=require('../logger').logger;
const {Read,Write}=require('../utils/fileService')
require('dotenv').config();
let userServ=require('../services/service');

let register =async(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        let { username,password} = req.body;
        if(username && password){
            let token= await userServ.registerServ(username,password);
            res.status(200)
            res.send({
                "message" : "successfull",
                "token":token
            });
        }
        else{
            res.status(400);
            throw('enter your username and pass');
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

let login=async(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        // console.log("jhg");
        let { username,password} = req.body;
        if(username && password){
            let token= await userServ.loginServ(username,password);
            res.send({
                "message" : "logged in",
                "token":token})
        }
        else{
            res.status(400);
            throw('enter your username and pass');
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

let create=(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(Object.keys(req.body).length!=0){
            let data=userServ.createService(req.user,req.body);
            res.send({
                "message" : "successfully added",
                "data" : data});
        }
        else{
            res.status(400);
            throw "empty body";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}
let deleteTask=(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(req.params.id){
            let data=userServ.delService(req.user,req.params.id);
            res.send(data);
        }
        else{
            throw "invalid params";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }   
}

let update=(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(Object.keys(req.body).length!=0){
            let data=userServ.updateService(req.user,req.body,req.params.id);
            res.send(data);
        }
        else {
            throw "empty body";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
    
}
let readTaskById=(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(req.params.id){
            let data=userServ.readTaskIdServ(req.user,req.params.id);
            res.send(data);
        }
        else{
            throw "invalid id";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}
let readAll=(req,res)=>{
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        console.log(!req.query);
        if(req.query.filter){
            let data=userServ.filterServ(req.user,req.query.filter);
            res.send(data);
        }
        else if(req.query.sort){
            let data=userServ.sortServ(req.user,req.query.sort,req.query.order || 'ascending');
            res.send(data);
        }
        else if(req.query.offset && req.query.limit){
            let data=userServ.pagination(req.user,req.query.offset,req.query.limit);
            res.send(data);
        }
        else if(Object.keys(req.query).length==0){
            let data=userServ.readAllServ(req.user);
            res.send(data);
        }
        else{
            throw "body or query params shouldnt be empty"
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        logger.error(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

module.exports={
    deleteTask,update,readTaskById,readAll,create,register,login,
}