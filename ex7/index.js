const express=require('express');
const app=express();
const cors=require('cors');
const fs=require('fs');
require('dotenv').config();

const auth =require('./middleware/auth');
const userRoute=require('./routes/userRoute').router;
const taskRoutes=require('./routes/routes').router;
const {Create} =require('./utils/fileService');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT']
}));

app.use('/user',userRoute);
app.use('/tasks',auth.verifyToken,taskRoutes);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
    if(!fs.existsSync(process.env.taskfile)){
        Create(process.env.taskfile);
        console.log("file created");
    }
    if(!fs.existsSync(process.env.userfile)){
        Create(process.env.userfile);
        console.log("file created");
    }
});

module.exports= app;