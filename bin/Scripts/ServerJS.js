var access_token = "";
var https = require('https');
var url = require("url");
var fs = require('fs');
var utils = require('./Utilities.js');
var appConfig = JSON.parse(fs.readFileSync('bin/Config/FBAppConfig.json'));
var WHToken = appConfig.webhookToken;
var appId = appConfig.appId;
console.log("appId - " + appId);
var appSecret = appConfig.appSecret;

exports.HandleIncomingMessage = function(req, res, callback){
    if(req.url.includes("webhookverify"))
           {
               console.log("Webhook Verification");
               var WHData = url.parse(req.url, true).search;
               console.log("Parse webhook data - " + WHData);
               var hubParams = utils.ParseSearchParams(WHData);
               res.writeHead(200, {'Content-Type' : 'text/html'});
               if(hubParams['hub.verify_token'] === WHToken){
                   console.log("Webhook matched - " + hubParams['hub.verify_token'] + " will send challenge - " + hubParams['hub.challenge']);
                   //var hubchallenge = JSON.stringify({"hub.challenge":hubParams['hub.challenge']});
                   res.end(hubParams['hub.challenge']);
               }
           }
           else if(req.url.includes("acme-challenge")){
               fs.readFile('./Public/OtherAssets' + req.url, function(error, stream){
                   if(!error){
                       res.write(stream);
                   }
                   else{
                       console.log("Error reading acme-challenge - " + error);
                   }
               });
           }
           else
           {
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
                     exports.ParseRequestParams(req, exports.StartReqParsing);
                 }
                 else {
                   console.log(error);
                 }
              });
           }
    
}

exports.ParseRequestParams = function(Request, callback) {
  console.log("Parsing request params");
  var body = "";
  Request.on('data', function (chunk) {
    body += chunk;
  });
  Request.on('end', function () {
    //console.log('body: ' + body);
    if(body !== "")
    {
      callback(body);
    }
});
}

exports.StartReqParsing = function(Body)
{
  //console.log(Body);
  var Data = JSON.parse(Body);
  //console.log("JSON - " + Data);
  var UserID = Data.UserID;
  access_token = Data.AuthToken;
  GetFBDetails();
  console.log("UserID - " + UserID);
  GetLongLivedToken();
}

GetFBDetails = function(){
  var options = {
    method: 'GET',
    host: 'graph.facebook.com',
    port: 443,
    path: '/me?access_token='+access_token
  };
  https.get(options, function(response){
    console.log("FBDetails - " + response.statusCode);
    response.on('data', function(data){
      console.log("FBName - " + JSON.parse(data).name);
    });
  });
};

GetLongLivedToken = function(){
  //Get long lived token using short expiry token and other details.
  var options = {
    method: 'GET',
    host: 'graph.facebook.com',
    port: 443,
    path: '/oauth/access_token?' +
    'grant_type=fb_exchange_token&' +
    'client_id=' + appId + '&' +
    'client_secret=' + appSecret + '&' +
    'fb_exchange_token=' + access_token
  };
  //console.log("Options are - " + options.path);
  https.get(options, function(response){
    console.log("FB Long Token - " + response.statusCode);
    response.on('data', function(data){
      console.log(JSON.parse(data));
    });
  });
};
