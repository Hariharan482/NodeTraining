let fs=require('fs');

let read= ()=>{
    data=fs.readFileSync('./cdw_ace23_buddies.json',"utf-8");
    console.log(JSON.parse(data));
    return JSON.parse(data);
}

module.exports={
    read,
}