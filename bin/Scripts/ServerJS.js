var access_token = "";
var https = require('https');
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
  GetFBDetails();
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
