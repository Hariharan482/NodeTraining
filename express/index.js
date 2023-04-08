// loading the required modules
let {existsSync}=require('fs');
let cors=require('cors');
let express=require('express');
let app=express();
require('dotenv').config();

let {fileCreate}=require('./utils/fileUtils');
let {router}=require("./routes/routes");
let logger=require('./logger').logger;


// console.log(process.env.level)
// parsing data present in body of req
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//router
app.use('/buddies',router);

//cors confg
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT']
}));

//port confg
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
    //creatiing file if doesnt exist
    if(!existsSync("./cdw_ace23_buddies.json")){
        fileCreate();
        console.log("file created");
    }
});