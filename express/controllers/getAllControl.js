let express=require('express');
// let router=express.Router();

let fileW=require('../service/filewrite').write;
let filer=require('../service/fileread').read;


function getAll(req,res) {
    // let dataArr=[];
    let data=filer();
    // console.log(data);

    res.send(data);
}

module.exports={
    getAll,
}