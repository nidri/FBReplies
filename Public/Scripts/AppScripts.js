/*** Service worker registration ***/
if('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('service-worker.js').then(function(registration) {
			//Registration successful
			//console.log("Service worker registered with scope - " + registration.scope);
		}, function(err) {
			//Registration failed
			console.log("Service worker registration failed - " + err);
		});
	});
	if(navigator.serviceWorker.controller) {
		//console.log("This page is controlled by " + navigator.serviceWorker.controller);
	}
	
	navigator.serviceWorker.oncontrollerchange = function() {
		//console.log("This page is now controlled by " + navigator.serviceWorker.controller);
	};
}



/* Starter script which loads the header and other html dynamically */

(function() {
    /*setTimeout(function(){
        //console.log($(".mdl-layout__header").html());
        //$(".mdl-layout__header").text("Santosh");
    }, 2000);*/
    
    var dialogButton = document.querySelector('.dialog-button');
    var dialog = document.querySelector('#dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialogButton.addEventListener('click', function() {
       dialog.showModal();
    });
    dialog.querySelector('.dialog-close').addEventListener('click', function() {
      dialog.close();
    });
}) ();




