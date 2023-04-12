const { response } = require('express');
let { Read, Write } = require('../utils/fileService');
let bcrpyt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

function validate(data) {
    if (!data.title || data.title.trim() == "" || !((/^[a-zA-Z]{1,15}$/).test(data.title))) {
        return false;
    }
    if (!data.description || data.description.trim() == "" || !((/^[a-z\sA-Z]{1,30}$/).test(data.description))) {
        return false;
    }
    if (!data.priority || data.priority.trim() == "" || !((/^[a-zA-Z]{1,5}$/).test(data.priority))) {
        return false;
    }
    if (!data.dueDate || data.dueDate.trim() == "" || !((/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(data.dueDate))) {
        return false;
    }
    if (!data.taskComments || !Array.isArray(data.taskComments)) {
        return false;
    }

    return true;
}
//checking if id is present
function validateUser(username) {
    let data = Read(process.env.userfile);
    return data.find( element => element.username == username );
}

async function registerServ(username, password) {
    let hpass = await bcrpyt.hash(password, 10);
    let data = Read(process.env.userfile);
    if (! validateUser(username) ) {
        const token = jwt.sign({username}, process.env.JWTSECRETKEY,{expiresIn:'30m'});
        data.push({ "username": username, "password": hpass });
        Write(process.env.userfile,data);
        response.status(200);
        return token;
    }
    else {
        response.status(400);
        throw ("user already exists");
    }
}

async function loginServ(username, password) {
    console.log(username,password);
    let user=validateUser(username);
    if (user && await bcrpyt.compare(password,user.password)) {
        const token = jwt.sign({username}, process.env.JWTSECRETKEY,{expiresIn:'24h'});
        return token;
    }
    else {
        response.status('404');
        throw ("not found");
    }
}

let createService=(user,data)=>{
    if(validate(data) && validateUser(user)){
        let fileData=Read(process.env.taskfile);
        let userTasks= fileData[user] || {};
        if(userTasks){
            userTasks={
                ...userTasks,
                [Date.now()] : data
            }
            fileData[user]=userTasks;
        }
        Write(process.env.taskfile,fileData);
        return(userTasks);
    }
    else{
        response.status('400');
        throw "invalid data or user"
    }
}

let delService=(user,id)=>{
    if(validateUser(user)){
        let fileData=Read(process.env.taskfile);
        // console.log(fileData[user][id]);
        if(fileData[user][id]){
            delete fileData[user][id]
            Write(process.env.taskfile,fileData);
            response.status(200);
            return ("successfull");
        }
        else{
            response.status(400);
            throw "task not found";
        }
    }
    else{
        response.status('400');
        throw "invalid user";
    }
    
}
let updateService=(user,data,id)=>{
    let fileData=Read(process.env.taskfile);
    if(validate(data) && validateUser(user) && fileData[user][id]){
        fileData[user][id]=data;
        response.status(200);
        return ("updated");
    }
    else{
        response.status('400');
        throw "not found";
    }
}

let readTaskIdServ=(user,id)=>{
    let fileData=Read(process.env.taskfile);
    let usertasks=fileData[user][id];
    if(validateUser(user) && usertasks){
        response.status(200);
        return (usertasks);
    }    
    else{
        response.status('400');
        throw("not found")
    }
}

let readAllServ=(user)=>{
    if(validateUser(user)){
        let fileData=Read(process.env.taskfile);
        let usertasks=fileData[user];
        if(usertasks){
            response.status(200);
            return(usertasks);
        }
        else{
            response.status('400');
            return ("no task found")
        }
    }
}
let filterServ=(user,filterdata)=>{
    let fileData=Read(process.env.taskfile);
    let userdata=fileData[user];
    let filters=filterdata.split(",");
    let filteredData=[];
    filters.forEach( (data) => {
        let [filterby,filtervalue] = data.split('=');
        for(let task in userdata){
            if(userdata[task][filterby] == filtervalue){
                filteredData.push(userdata[task]);
            }
        }   
    });
    if(filteredData){
        response.status(200);
        return filteredData;
    }
    else{
        response.status('400');
        throw "no tasks found";
    }
    
}
let sortServ=(user,sort,order)=>{
    let fileData=Read(process.env.taskfile);
    let userdata=fileData[user];
    let sortedData=[];
    for(let task in userdata){
        sortedData.push(userdata[task]);
    }   
    console.log(order);
    let direction= (order=='descending')? 1 : -1;
    sortedData.sort((a,b)=>{
        return direction * a[sort].localeCompare(b[sort]);
    })
    return sortedData;
}
let pagination=(user,offset,limit)=>{
    let fileData=Read(process.env.taskfile);
    let userdata=fileData[user];
    let strtindex=(offset-1) * limit;
    let endindex=offset*limit;
    let result=Object.values(userdata).splice(strtindex,endindex);
    return result;
}
module.exports = {
    registerServ, loginServ,createService,delService,updateService,readTaskIdServ,readAllServ,filterServ,sortServ,pagination,
}
