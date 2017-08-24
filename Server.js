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
    console.log("From - " + req.socket.remoteAddress + " - Requesting - " + req.url);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader("Strict-Transport-Security", "max-age=604800");
    ServerScripts.HandleIncomingMessage(req, res);
});
server.listen(443, function(){
    console.log("Node server is running");
    console.log("Current directory - " + process.cwd());
});

httpserver.listen(80);
