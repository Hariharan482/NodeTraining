let express=require('express');
// let router=express.Router();

let fileW=require('../service/filewrite').write;
let filer=require('../service/fileread').read;


function delControl(req,res) {
    // let dataArr=[];
    let data=filer();
    let id=req.params.id;
    let delIndex=0;
    data.forEach((element,index) => {
        if(element.employeeid == id) {
            delIndex=index;
        }
    });
    data.splice(delIndex,1);
    fileW(data);
    res.send({"message": "deleted"})
}

module.exports={
    delControl,
}