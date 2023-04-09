let fs=require('fs');

let write= (data)=>{
    fs.writeFileSync('./cdw_ace23_buddies.json',JSON.stringify(data),"utf-8");
}

module.exports={
    write,
}