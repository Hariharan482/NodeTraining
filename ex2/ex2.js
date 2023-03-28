let http=require('http');
let fs=require('fs');

http.createServer(async(req,res,err)=>{
    var randomColors=[]; 
    let data =await fs.readFileSync('../color_ palette.json',"utf-8");
    let data_arr = JSON.parse(data);
    let i=0;
    while(i++<5){
        randomColors.push(data_arr[Math.floor(Math.random()*data_arr.length)]);
    }
    fs.writeFileSync('./ex2_random_color.json',JSON.stringify(randomColors),"utf-8",(err)=>{
            if(err)
                console.log(err); 
    });
    let getColors= await fs.readFileSync('ex2_random_color.json','utf-8');
    console.log(getColors);
    res.write(JSON.stringify(randomColors));
    res.end();
}).listen(4000);