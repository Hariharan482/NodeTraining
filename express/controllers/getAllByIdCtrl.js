let express=require('express');
// let router=express.Router();

let fileW=require('../service/filewrite').write;
let filer=require('../service/fileread').read;


function getById(req,res) {
    // let dataArr=[];
    let data=filer();
    let id=req.params.id;
    // console.log(data);
    data.forEach((element,index)=>{
        // console.log(id, "jfj");
        if(element.employeeid == id) {
            res.send(JSON.stringify(element));
            // console.log(element);
        }
    });
    // res.send({"message": "all buddies available are displayed"})
}

module.exports={
    getById,
}