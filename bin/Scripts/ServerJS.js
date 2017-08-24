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

/*** HandleIncomingMessage ***/
exports.HandleIncomingMessage = function(req, res, callback){
    if(req.url == "/")
    {
        console.log("Requesting Index.html - " + req.url);
      fs.readFile('./Public/Index.html', function(error, stream){
         if(!error)
         {
             res.statusCode = 200;
             res.write(stream);
             res.end();
         }
         else
         {
             res.statusCode = 404;
             res.write("Not Found");
             res.end();
             console.log("Error reading Index.html file - " + error);
         }
      });
    }
    
    else if(req.url.includes("webhookverify")) // Handle webhook message from facebook
           {
               console.log("Webhook Verification");
               var WHData = url.parse(req.url, true).search;
               console.log("Parse webhook data - " + WHData);
               var hubParams = utils.ParseSearchParams(WHData);
               exports.ParseRequestParams(req, utils.ProcessWebhookData);
               //res.setHeader('Content-Type' , 'text/html');
               res.statusCode = 200;
               if(hubParams['hub.verify_token'] === WHToken){
                   console.log("Webhook matched - " + hubParams['hub.verify_token'] + 
                   " will send challenge - " + hubParams['hub.challenge']);
                   res.write(hubParams['hub.challenge']);
               }
               res.end();
           }
           else if(req.url.includes("acme-challenge")){ // Handle lets encrypt message
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
               fs.readFile('.' + req.url, function(error, stream){ // Handle all other files
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
                   res.statusCode = 404;
                   res.write("Not Found");
                   res.end();
                 }
              });
           }
}

/*** ParseRequestParams ***/
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

/*** StartReqParsing ***/
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

/*** GetFBDetails ***/
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

/*** GetLongLivedToken ***/
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
