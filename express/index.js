let express=require('express');
let app=express();
let fs=require('fs');
let filecreate=require('./service/filecreate');
let addroute=require("./routes/addRoute").router;
let getAllroute=require('./routes/getAllroute').router;
let updateroute=require('./routes/updateRoute').router;
let delroute=require('./routes/delRoute').router;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/add',addroute);
app.use('/get',getAllroute);
app.use('/update',updateroute);
app.use('/del',delroute);
// app.use('/',(req,res) => {
    
//     res.send();
// });


// app.use('/create');
const port=4000;
app.listen(port,()=>{
    if(!fs.existsSync("./cdw_ace23_buddies.json")){
        filecreate.create();
        console.log("file created");
    }
});