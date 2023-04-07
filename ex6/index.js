const express=require('express');
const app=express();
const cors=require('cors');
const fs=require('fs');
require('dotenv').config();
const { auth }=require('./middleware/auth.js');

const routes=require('./routes/routes.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT']
}));

// app.use('/buddies',auth,route);
app.use('/buddies',routes);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
    if(!fs.existsSync("tasksData.json")){
        filecreate();
        console.log("file created");
    }
    if(!fs.existsSync("userData.json")){
        filecreate();
        console.log("file created");
    }
});