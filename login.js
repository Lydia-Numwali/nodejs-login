
// const http = require('http');
// const fs = require('fs');

// http.createServer((req, res) => {
//     if(req.method==='GET'){
//        fs.readFile('login.html','utf-8',(err,data)=>{

//         if(err) console.log(err);

//         res.writeHead(200,{'Content-Type':'text/html'
//     });
//         res.write(data);
//         res.end();
//        }); 
//     } else if (req.method === 'POST' && req.url==='/submit') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString()
//      });
//         req.on('end', () => {
//             fs.readFile('user.txt', 'utf-8', (err, data) => {
//                 if(err) {
//                     console.log("An error occurred while reading the user.txt file: ", err);
//                     res.end("An error occurred while processing your request. Please try again later.");
//                 }
               
//                 if (body === data) {
//                     res.end('successfully logged in!')
//                 }
//                 else {
//                      res.end("invalid credentials");
//                }
//            })
//         })
//     }

// })
// .listen(8080, () => {
//     console.log('server listening on port 8080');
// })

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('./login.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      const postData = qs.parse(body);
      fs.readFile('user.txt', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
         const lines = data.split('\n');
        let email = ""
        let password = ""
        lines.forEach(line => {
         
          const parts = line.split(':')
          if (parts[0].trim() === "email") {
            email = parts[1].trim()
          }
          if (parts[0].trim() === "password") {
            password = parts[1].trim()
          }
        });
        
        if (postData.email === email && postData.password === password) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>user logged in successfully</h1>');
        }// else {
        //   res.writeHead(401, { 'Content-Type': 'text/html' });
        //   res.end('<h1>Error: Invalid credentials</h1>');
        // }
      });
    });
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});