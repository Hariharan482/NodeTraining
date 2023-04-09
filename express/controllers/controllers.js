const { response } = require('express');
let {logger}=require('../logger');
let dataServ=require('../service/dataService');

function addControl(req,res){
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(Object.keys(req.body).length!=0  ){
            let data=dataServ.add(req.body,req.body.id);
            res.send(data);
        }
        else {
            res.status(400);
            throw new Error("body shouldnt be empty");
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

function delControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if(Number(req.params.id)){
            let data = dataServ.del(req.params.id);
            res.send(data);            
        }
        else{
            res.status(400);
            throw "invalid params";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

function getIdControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if( (/^[0-9]{1,10}$/).test(req.params.id) ){
            let data = dataServ.getById(req.params.id);
            console.log("1"+data);
            res.send(data);            
        }
        else{
            res.status(400);
            throw  new Error ("invalid params");
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){   
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

function getAllControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        let data=dataServ.getAll();
        res.send(data);
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
    
}

function updateControl(req,res){
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if( Object.keys(req.body).length!=0 && req.params.id!=null){
            let data=dataServ.update(req.body,req.params.id);
            res.send(data);
        } 
        else if (Object.keys(req.query).length>0 ){
            let data=dataServ.update(req.query,req.query.id);
            res.send(data);
        }
        else{
            res.status(400);
            throw "body or query string shouldn't be empty";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){    
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

module.exports={
    addControl,updateControl,delControl,getIdControl,getAllControl,
}