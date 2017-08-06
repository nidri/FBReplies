function StartFBProcessing(AuthResponse)
{
  console.log("AuthResponse");
  console.log(AuthResponse);
  var Params = "{\"AuthToken\":" + "\"" + AuthResponse.authResponse.accessToken + "\"";
  Params = Params + ", ";
  Params = Params + "\"UserID\":" + "\"" + AuthResponse.authResponse.userID + "\""+ "}";
  //Params = JSON.stringify(Params);
  console.log(Params);
  FBRequest("Public/OtherAssets/ProcessingText.txt", Params, ProcessFBRequest);
}

function ProcessFBRequest(Response) {
  //document.getElementById('status').innerHTML = Response;
}

function FBRequest(theUrl, Params, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
        }
  xmlHttp.open("POST", theUrl, true); // true for asynchronous
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(Params);
}
