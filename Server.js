var https = require('https');
var http = require('http');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./SSL/key.pem'),
  cert: fs.readFileSync('./SSL/certificate.pem')
};
var ServerScripts = require('./bin/Scripts/ServerJS.js');
var httpserver = http.createServer(function(req, res){
    console.log("Normal http request received");
    res.writeHead(301, {'Content-Type': 'text/plain', 
        'Location':'https://'+req.headers.host+req.url
    });
    res.end('Redirecting to SSL\n');
});
var server = https.createServer(options, function (req, res) {
    console.log("Requesting - " + req.url);
    //console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html',
    "Strict-Transport-Security": "max-age=604800"});
    if(req.url == "/")
    {
      fs.readFile('./Public/Index.html', function(error, stream){
         if(!error)
         {
             res.write(stream);
             //console.log(stream);
             res.end();
         }
         else
         {
             console.log("Error reading Index.html file - " + error);
         }
      });
    }
    else {
      ServerScripts.ParseRequestParams(req, ServerScripts.StartReqParsing);
      fs.readFile('.' + req.url, function(error, stream){
        console.log("Started reading - " + req.url);
         if(!error)
         {
           if(req.url.includes("CSS"))
           {
             res.writeHead(200, { 'Content-Type': 'text/css' });
           }
             res.write(stream);
             console.log("Completed reading - " + req.url);
             res.end();
         }
         else {
           console.log(error);
         }
      });
    }

    //console.log(res);

});
server.listen(443, function(){
    console.log("Node server is running");
    console.log("Current directory - " + process.cwd());
});

httpserver.listen(80);
