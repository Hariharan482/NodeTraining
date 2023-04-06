let fs=require('fs');
// console.log(fs);

let randomColors=[];  
async function processFile(){
    await fs.readFile('color_ palette.json',(err,data) => {
        if(err){
        console.log("no such file");
        }   
        else {
            if(data.length!=0){
                let data_arr=JSON.parse(data);
                let i=0;
                
                while(i++<5){
                    randomColors.push(data_arr[Math.floor(Math.random()*data_arr.length)]);
                }
                console.log(randomColors);
                fs.writeFile('random_color.json',JSON.stringify(randomColors),(err)=>{
                    if(err)
                        console.log(err);
                })
            }
            else{
                console.log("empty file");
            }
        }   

    });
}
processFile();








 