
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if(req.method==='POST'){
       fs.readFile('login.html','utf-8',(err,data)=>{

        if(err) console.log(err);

        res.writeHead(200,{'Content-Type':'text/html'
    });
        res.write(data);
        res.end();
       }); 
    } else if (req.method === 'POST' && req.url==='/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
     });
        req.on('end', () => {
            fs.readFile('user.txt', (err, data) => {
                if(err) {
                    res.end("An error occurred");
                    console.log("An error occurred while reading the user.txt file: ", err);
                }
               
                if (body === data) {
                    res.end('successfully logged in!')
                }
                else {
                     res.end("invalid credentials");
               }
           });
        });
    }

})
.listen(8080, () => {
    console.log('server listening on port 8080');
});
