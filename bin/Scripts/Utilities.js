/*** ParseSearchParams ***/
exports.ParseSearchParams = function(str){
    console.log("Parsing Webhook query- " + str);
    var Obj = {};
    var Params = str.substring(1).split("&");
    for(var i in Params){
        console.log(Params[i]);
        var entry = Params[i].split("=");
        console.log(entry[0]);
        Obj[entry[0]] = entry[1];
    }
    return Obj;
};

/*** ProcessWebhookData ***/
exports.ProcessWebhookData = function(Body)
{
  console.log(Body);
  var Data = JSON.parse(Body);
  console.log("Webhook Data - " + Data.object);
}
