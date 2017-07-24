var http = require('http');
var fs = require('fs');
var ServerScripts = require('./bin/Scripts/ServerJS.js');
var server = http.createServer(function (req, res) {
    console.log(req.url);
    //console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write("Congratulations on completing 9 years in IT Industry!!");
    if(req.url == "/")
    {
      fs.readFile('./Index.html', function(error, stream){
         if(!error)
         {
             res.write(stream);
             //console.log(stream);
             res.end();
         }
      });
    }
    else {
      ServerScripts.ParseRequestParams(req, ServerScripts.StartReqParsing);
      fs.readFile('.' + req.url, function(error, stream){
        console.log("Started reading - " + req.url);
         if(!error)
         {
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
server.listen(80, function(){
    console.log("Node server is running");
});
