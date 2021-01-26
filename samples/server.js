const http = require('http');

//create web server
const server = http.createServer(function (req, res) {   
  //check the URL of the current request
  if (req.url == '/') { 
      // set response header
      res.writeHead(200, { 'Content-Type': 'text/html' }); 
      
      // set response content    
      res.write('<html><body><p>Welcome to todo app.</p></body></html>');
      res.end();
  
  } else if (req.url == "/todo") { 
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<html><body><p>This is the list of your Todos.</p></body></html>');
      res.end();
  
  } else if (req.url == "/admin") {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<html><body><p>This is admin Page.</p></body></html>');
      res.end();
  
  } else {
      res.end('Invalid Request!');
  }
});

server.listen(8080);