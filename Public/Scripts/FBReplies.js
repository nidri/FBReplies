// Global variables
var user = {};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response.status);
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    OnLogin(response);
  } else {
    
  }
  // Event subscriptions
  FB.Event.subscribe('auth.login', login_event);
  FB.Event.subscribe('auth.logout', logout_event);
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '495616707450697',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.10' // use graph api version 2.8

});
console.log("Calling from inside AsyncInit");
// Determine the login status of user

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function OnLogin(AuthResponse) {
    user.userId = AuthResponse.authResponse.userID
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    user.userName = response.name;
    console.log("UserName - " + user.userName);
      //console.log(response);
      StartFBProcessing(AuthResponse);
  });
}

function Logout() {
  // user is now logged out
  FB.logout(function(response) {
    console.log(response);
    document.location.reload();
  });
  console.log("Logged out");
}

var login_event = function(response) {
  console.log("login_event");
  console.log(response.status);
  console.log(response);
  statusChangeCallback(response);
  //StartFBProcessing(response);
}

var logout_event = function(response) {
  console.log("logout_event");
  console.log("Logout - " + response.status);
  console.log(response);
  checkLoginState();
}

var statuschange_event = function(response) {
    console.log("statuschange_event - " + response.status);
    console.log(response);
    checkLoginState();
}
