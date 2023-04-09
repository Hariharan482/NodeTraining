const { response } = require('express');
let { fileWrite , fileRead }=require('../utils/fileUtils');

//validating json data present in request object
function validate(data){
    if(data.id==null || !(/^[0-9]{1,10}$/).test(data.id) ){
        return false;
    }
    if(data.realName.trim()=="" || !(/^[a-zA-Z]{1,30}$/).test(data.realName) ){
        return false;
    }
    if(data.nickName.trim()=="" || !(/^[a-zA-Z]{1,15}$/).test(data.nickName) ){
        return false;
    }
    if(data.dob.trim()=="" || !(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(data.dob) ){
        return false;
    }
    if( !Array.isArray(data.hobbies) ){
        return false;
    }

    return true;
}
//checking if id is present
 function validateId(id){
    let dataArr= fileRead();
    return dataArr.some(element=>element.id==id)
}
// add buddy service 
 function add(data,id){
    //checking if id and json obj is eligible to use 
    if(validate(data) && !validateId(id)){
        let fileData= fileRead();
        fileData.push(data);
         fileWrite(fileData);
        response.status(200);
        return ({"message": "buddy added"});
    }
    else{
        response.status(404);
        throw "invalid req obj or id";
    }
}
//del buddy service 
 function del(id){
    //checking if id is present or not
    if(validateId(id)){
        let dataArr= fileRead();
        dataArr=dataArr.filter(element=>element.id!=id);
        fileWrite(dataArr);
        response.status(200);
        return ({"message": "deleted"});
    }
    else{
        response.status(404);
        throw "id not found";
    }
}
// getById buddy service 
 function getById(id){
    //checking if id is present or not
    if(validateId(id)){
        let dataArr= fileRead();
        let index=dataArr.findIndex(element=>element.id==id);
        response.status(200);
        return dataArr[index];
    }
    else{
        response.status(404);
        throw "id not found";
    }
}
//getAll buddy service 
function getAll(){
    let filedata= fileRead();
    response.status(200);
    return filedata;
}
//update buddy service
 function update(data,id){
    //validating json obj and params id
    if(validate(data) && validateId(id)){
        dataArr=fileRead();
        //finding buddy
        dataArr.forEach((element,index) => {
            if(element.id == id ) {
                if(data.id == id){
                    dataArr[index]=data;
                    index=dataArr.length;
                }
                else{
                    response.status(404);
                    throw "body id & params id must match"
                }
            }
        });
        fileWrite(dataArr);
        response.status(200);
        return ({"message": "updated "});
    }
    else{
        response.status(404);
        throw "invalid req obj or id";
    }
}
//exporting module
module.exports={
    validate,add,getById,getAll,getById,update,del
}