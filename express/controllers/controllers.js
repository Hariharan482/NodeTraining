const { response } = require('express');
let {logger}=require('../logger');
let dataServ=require('../service/dataService');

//add buddy control
function addControl(req,res){
    try{
        //info logger
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //checking whether body of req is empty 
        if(Object.keys(req.body).length!=0  ){
            // dataService add module
            let data=dataServ.add(req.body,req.body.id);
            res.send(data);
        }
        else {
            //throwing error if req.body is empty
            res.status(400);
            throw "body shouldnt be empty";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        //catching error and logging it
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

//del buddy control
function delControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //checking whether params.id is a number
        if((/^[0-9]{1,10}$/).test(req.params.id)){
            //data service del module
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
        //logger
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

//getId control
function getIdControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //checking whether params.id is a number
        if( (/^[0-9]{1,10}$/).test(req.params.id) ){
            let data = dataServ.getById(req.params.id);
            console.log("1"+data);
            res.send(data);            
        }
        else{
            res.status(400);
            throw "invalid params";
        }
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){   
        //logger
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

//getAll control
function getAllControl(req,res) {
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //dataservice getall module
        let data=dataServ.getAll();
        res.send(data);
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    catch(err){
        //logger
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
    
}

//update control
function updateControl(req,res){
    try{
        logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //checking whether body of req is empty 
        if( Object.keys(req.body).length!=0 && req.params.id!=null){
            let data=dataServ.update(req.body,req.params.id);
            res.send(data);
        } 
        //checking whether query params is empty 
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
        //logger
        res.statusCode=(res.statusCode==400 || res.statusCode==404 || res.statusCode==200)?res.statusCode:500;
        logger.warn(` ${res.statusCode} - ${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.send(err);
    }
}

//exporting module
module.exports={
    addControl,updateControl,delControl,getIdControl,getAllControl,
}