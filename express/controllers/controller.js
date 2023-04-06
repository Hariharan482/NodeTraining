let express=require('express');
// let router=express.Router();
let logger=require('../logger').logger;
let fileW=require('../service/fileService').write;
let filer=require('../service/fileService').read;

function addControl(req,res) {
    // let dataArr=[];
    let data=filer();
    if(Object.keys(req.body)!=0){
        data.push(req.body);
        fileW(data);
        res.send({"message": "buddy added"})
    }
    else if(Object.keys(req.query).length>0){
        data.push(req.query);
        fileW(data);
        res.send({"message": "buddy added"})
    }
    else{
        res.send("body or query string shouldnt be empty");
    }
}

function delControl(req,res) {
    // let dataArr=[];
    let data=filer();
    let id=req.params.id;
    let delIndex=0;
    data.forEach((element,index) => {
        if(element.id == id) {
            delIndex=index;
        }
    });
    data.splice(delIndex,1);
    fileW(data);
    res.send({"message": "deleted"})
}

function getById(req,res) {
    // let dataArr=[];
    let data=filer();
    console.log(Object.keys(req.query));
    let id=req.params.id;
    // console.log(data);
    data.forEach((element,index)=>{
        // console.log(id, "jfj");
        if(element.id == id) {
            res.send(JSON.stringify(element));
            // console.log(element);
        }
    });
    // res.send({"message": "all buddies available are displayed"})
}

function getAll(req,res) {
    let data=filer();
    // console.log(data);
    res.send(data);
}

function updateControl(req,res,err) {
    // let dataArr=[];
    try{
        let data=filer();
        let id=req.params.id;
        let keyLen=Object.keys(req.query).length;
        if(Object.keys(req.body).length!=0)
        {
            console.log(req.body);
            data.forEach((element,index) => {
                if(element.id == id) {
                    data[index]=req.body;
                    console.log("2"+data[index]);
                }
            });
            fileW(data);
            res.send({"message": "updated "})
        }
        else if(keyLen){
            keys=['id','hobbies'];
            let query=req.query;
            queryKey=Object.keys(query);
            let bool=queryKey.every(elem => keys.includes(elem));
            if(bool){
                data.forEach((element,index)=>{
                    // console.log(element.id,query.id);
                    if(element.id == query.id) {
                        data[index]=req.query;
                    }
                });
                fileW(data);
                res.send({"message": "updated "});
            }
            else{
                res.send("invalid query string");
            }
        }
        else{
            res.send("empty body");
            throw "body shouldn't be empty";
        }
    }
    catch(err){
        logger.warn(` ${err.statusCode} - ${err} - ${err.originalUrl} - ${err.method} - ${err.ip}`);
        res.end();
    }
}

module.exports={
    addControl,updateControl,delControl,getById,getAll,
}
