let express=require('express');
// let router=express.Router();

let fileW=require('../service/filewrite').write;
let filer=require('../service/fileread').read;


function updateControl(req,res) {
    // let dataArr=[];
    let data=filer();
    let id=req.params.id;
    data.forEach((element,index) => {
        if(element.employeeid == id) {
            data[index]=req.body;
        }
    });
    fileW(data);
    res.send({"message": "updated "})
}

module.exports={
    updateControl,
}