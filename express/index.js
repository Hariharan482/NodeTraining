let {existsSync}=require('fs');
let cors=require('cors');
let express=require('express');
let app=express();
require('dotenv').config();

let {fileCreate}=require('./utils/fileUtils');
let {router}=require("./routes/routes");
let logger=require('./logger').logger;


// console.log(process.env.level)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/buddies',router);

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT']
}));

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
    if(!existsSync("./cdw_ace23_buddies.json")){
        fileCreate();
        console.log("file created");
    }
});