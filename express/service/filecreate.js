let fs=require('fs');


let create=()=>{
    console.log("creating");
    fs.writeFileSync('./cdw_ace23_buddies.json',"[]","utf-8");
}    

module.exports={
    create,
}