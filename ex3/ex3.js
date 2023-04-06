let http=require('http');
let fs=require('fs');
var rn = require('random-number');

//creating server
http.createServer(async (req, res, err) => {
    let randomColors=[];  
    //reading file
    await fs.readFile('color_ palett.json', (err, data) => {
        if (err) {
            console.log("no such file");
        }
        else {
            if (data.length != 0) {
                let data_arr = JSON.parse(data);
                // random no generator
                var gen = rn.generator({
                    min:  0, 
                    max:  data_arr.length, 
                    integer: true
                }) 
                //pushing random 5 colors to an array   
                let i = 0;
                while (i++ < 5) {
                    randomColors.push(data_arr[gen()]);
                }
                //writing random 5 colors to a file
                fs.writeFileSync('random_color.json', JSON.stringify(randomColors), (err) => {
                    if (err)
                        console.log(err);
                })
                // reading the 5 random colors from newly edited file
                let getColors= fs.readFileSync('random_color.json','utf-8');
                console.log(req.headers);
                // setting header 
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.write(getColors);
                res.end();
            }
            else {
                console.log("empty file");
            }

        }
    });

}).listen(4001);