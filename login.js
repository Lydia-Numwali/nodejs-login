const express=require("express");
const mongoose=require("mongoose");
const app=express();

const url="mongodb+srv://Numwali123:Numwali2023@cluster0.5ocowna.mongodb.net/?retryWrites=true&w=majority";

async function connect(){
    try{
        await mongoose.connect(url);
        console.log("Connected to Mongoose");
    }
    catch(error){
        console.error(error);
    }
}

connect();
const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const port=4000;
const hostname='localhost';

const server = http.createServer((req, res) => {
     fs.readFile("login.html",'utf-8', (err, data) => {
                if (err){console.log(err)}
                else{
                    console.log(data);
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data)
                    res.end()
                }

            });

});
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});
