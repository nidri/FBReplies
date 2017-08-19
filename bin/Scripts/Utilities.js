
exports.ParseSearchParams = function(str){
    console.log("Parsing - " + str);
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
