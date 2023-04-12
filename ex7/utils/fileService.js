const { response } = require('express');
let fs=require('fs');

//create file service
let Create=(path)=>{
        console.log("creating");
        fs.writeFileSync(path,"[]","utf-8");
}    
//file read service
let Read= (path)=>{
        data=fs.readFileSync(path,"utf-8");
        // console.log(JSON.parse(data));
        return JSON.parse(data);
}
//write file service
let Write= (path,data)=>{
    console.log("success");
    fs.writeFileSync(path,JSON.stringify(data),"utf-8");
}
//exporting modules
module.exports={
    Create,Read,Write,
}