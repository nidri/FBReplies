var https = require('https');
var http = require('http');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./SSL/letsencrypt/domain.key'),
  cert: fs.readFileSync('./SSL/letsencrypt/chained.pem')
};
var ServerScripts = require('./bin/Scripts/ServerJS.js');

var httpserver = http.createServer(function(req, res){
    console.log("Normal http request received from - " + req.socket.remoteAddress + " - requesting - " + req.url);
    res.writeHead(301, {'Content-Type': 'text/plain',
        'Location':'https://'+req.headers.host+req.url
    });
    res.end('Redirecting to SSL\n');
});

var server = https.createServer(options, function (req, res) {
    console.log("From - " + req.socket.remoteAddress + " - Requesting - " + req.url + " - Content-Type -- " + 
    req.headers);
    //console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html',
    "Strict-Transport-Security": "max-age=604800"});
    if(req.url == "/")
    {
      fs.readFile('./Public/Index.html', function(error, stream){
         if(!error)
         {
             res.write(stream);
             res.end();
         }
         else
         {
             console.log("Error reading Index.html file - " + error);
         }
      });
    }
    else {
      ServerScripts.HandleIncomingMessage(req, res);
    }

    //console.log(res);

});
server.listen(443, function(){
    console.log("Node server is running");
    console.log("Current directory - " + process.cwd());
});

httpserver.listen(80);
