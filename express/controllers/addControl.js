let express=require('express');
// let router=express.Router();

let fileW=require('../service/filewrite').write;
let filer=require('../service/fileread').read;


function addControl(req,res) {
    // let dataArr=[];
    let data=filer();
    // console.log(data);
    data.push(req.body);
    fileW(data);
    res.send({"message": "buddy added"})
}

module.exports={
    addControl,
}