const { response } = require('express');
let fs=require('fs');


let fileCreate=()=>{
        console.log("creating");
        fs.writeFileSync('./cdw_ace23_buddies.json',"[]","utf-8");
}    

let fileRead= ()=>{
        data=fs.readFileSync('./cdw_ace23_buddies.json',"utf-8");
        // console.log(JSON.parse(data));
        return JSON.parse(data);
}

let fileWrite= (data)=>{
    fs.writeFileSync('./cdw_ace23_buddies.json',JSON.stringify(data),"utf-8");
}


module.exports={
    fileCreate,fileRead,fileWrite,
}