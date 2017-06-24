var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    //console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write("Congratulations on completing 9 years in IT Industry!!");
    fs.readFile('./Index.html', function(error, stream){
       if(!error) 
       {
           res.write(stream);
           //console.log(stream);
           res.end();
       }
    });
    //console.log(res);
    
});
server.listen(80);
console.log("Node server is running");
