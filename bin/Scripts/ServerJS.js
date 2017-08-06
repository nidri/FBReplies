var access_token = "";
var https = require('https');
var fs = require('fs');
var appConfig = JSON.parse(fs.readFileSync('bin/Config/FBAppConfig.json'));
console.log(appConfig);
var appId = appConfig.appId;
var appSecret = appConfig.appSecret;
console.log("appSecret - " + appSecret);
exports.ParseRequestParams = function(Request, callback) {
  console.log("Parsing request params");
  //console.log(Request);
  //console.log("Done reading");
  var body = "";
  Request.on('data', function (chunk) {
    body += chunk;
  });
  Request.on('end', function () {
    //console.log('body: ' + body);
    if(body != "")
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
  console.log("UserID - " + UserID);
  //GetLongLivedToken();
}

GetFBDetails = function(){
  var options = {
    method: 'GET',
    host: 'graph.facebook.com',
    port: 443,
    path: '/me?access_token='+access_token
  };

  https.get(options, function(response){
    console.log("FB - " + response.statusCode);
    response.on('data', function(data){
      console.log(JSON.parse(data));
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
    'grant_type=fb_exchange_token&amp;' +
    'client_id=' + appId + '&amp;' +
    'client_secret=' + appSecret + '&amp;' +
    'fb_exchange_token=' + access_token
  };
  https.get(options, function(response){
    console.log("FB Long Token - " + response.statusCode);
    response.on('data', function(data){
      console.log(JSON.parse(data));
    });
  });
};
