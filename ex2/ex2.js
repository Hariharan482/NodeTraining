let http = require('http');
let fs = require('fs');

//creating server
http.createServer(async (req, res, err) => {
    let randomColors=[];  
     //reading file
    await fs.readFile('color_ palette.json', (err, data) => {
        if (err) {
            console.log("no such file");
        }
        else {
            if (data.length != 0) {
                let data_arr = JSON.parse(data);
                let i = 0;
                //pushing random 5 colors to an array   
                while (i++ < 5) {
                    // console.log(typeof(data_arr));
                    randomColors.push(data_arr[Math.floor(Math.random() * data_arr.length)]);
                }
                console.log(randomColors);
                //writing random 5 colors to a file
                fs.writeFile('random_color.json', JSON.stringify(randomColors), (err) => {
                    if (err)
                        console.log(err);
                })
                console.log(req.headers);
                // setting header of res obj
                res.writeHead(200,{'Content-Type': 'application/json'});
                // res.setHeader('Content-Type', 'application/json');
                console.log({randomColors});
                res.write(JSON.stringify(randomColors));
                res.end();
            }
            else {
                console.log("empty file");
            }

        }
    });
   
}).listen(80);