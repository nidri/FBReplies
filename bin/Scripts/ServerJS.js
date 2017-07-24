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
  console.log("UserID - " + UserID);
}
