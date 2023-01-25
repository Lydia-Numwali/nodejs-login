const http =require('http');
const hostname='localhost';
const port=4000;
const fs=require('fs');
 const server=http.createServer(function (req,res){
    fs.readFile('login.html', function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });
});
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});