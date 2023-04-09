const { response } = require('express');
let fs=require('fs');

//create file service
let fileCreate=()=>{
        console.log("creating");
        fs.writeFileSync('./cdw_ace23_buddies.json',"[]","utf-8");
}    
//file read service
let fileRead= ()=>{
        data=fs.readFileSync('./cdw_ace23_buddies.json',"utf-8");
        // console.log(JSON.parse(data));
        return JSON.parse(data);
}
//write file service
let fileWrite= (data)=>{
    fs.writeFileSync('./cdw_ace23_buddies.json',JSON.stringify(data),"utf-8");
}
//exporting modules
module.exports={
    fileCreate,fileRead,fileWrite,
}