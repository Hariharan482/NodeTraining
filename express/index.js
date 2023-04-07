let express=require('express');
let app=express();
let fs=require('fs');
let cors=require('cors');
let filecreate=require('./service/fileService');
let route=require("./routes/routes").router;
let logger=require('./logger').logger;
require('dotenv').config();

// console.log(process.env.level)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/add',route);
app.use('/get',route);
app.use('/update',route);
app.use('/del',route);
app.use('/',(req,res) => { 
    // logger.info("Welcome");
    // logger.info(` ${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    // logger.error(` ${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    // logger.debug("Welcome");
    res.send("Welcome");
});
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT']
}));

// app.use('/create');
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
    if(!fs.existsSync("./cdw_ace23_buddies.json")){
        filecreate.create();
        console.log("file created");
    }
});