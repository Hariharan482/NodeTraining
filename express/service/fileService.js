let fs=require('fs');


let create=()=>{
    console.log("creating");
    fs.writeFileSync('./cdw_ace23_buddies.json',"[]","utf-8");
}    

let read= ()=>{
    data=fs.readFileSync('./cdw_ace23_buddies.json',"utf-8");
    // console.log(JSON.parse(data));
    return JSON.parse(data);
}

let write= (data)=>{
    fs.writeFileSync('./cdw_ace23_buddies.json',JSON.stringify(data),"utf-8");
}


module.exports={
    create,read,write,
}