// Script file for Google signin.

var GParams = {
	'client_id' : '850277399217-f0lr8qbl0eraffild343kmsna5q3s7pa.apps.googleusercontent.com', 
	'scope' : 'profile email'
};

var gAuth;

// Start signing in 
function initClient() {
  // 2. Initialize the JavaScript client library.
  gAuth = gapi.auth2.init(GParams);
  gAuth.then(function(Auth) {
    console.log("Google signin - " + Auth.isSignedIn.get());
    //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    
  }, function(error) {
  		console.log("Google Signin error - " + JSON.stringify(error, undefined, 2));
  });
  if(!gAuth.isSignedIn.get()) {
    	$("#authorize-button").click(handleAuthClick);
    }
    else {
    	$("#authorize-button").click(handleSignout);
    }
}



function handleAuthClick(event) {
    gAuth.signIn();
    $("#authorize-button").click(handleSignout);
}

function handleSignout(event) {
	gAuth.SignOut();
	$("#authorize-button").click(handleAuthClick);
}

function handleClientLoad() {
	// Load the API client and auth2 library
	gapi.load('client:auth2', initClient);
}

function onSignIn() {
	console.log("On google signin");
}