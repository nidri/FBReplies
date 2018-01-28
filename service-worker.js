//Install Service Worker

var CACHE_NAME = 'vaiolog-cache-v1';
var OFFINE_URL = '/Public/Offline.html';
var urlsToCache = [
  '/Public/CSS/Styles.css', 
  '/Public/Images/NYCBridge.jpg', 
  '/Public/Scripts/AppScripts.js', 
  '/Public/Index.html', 
  '/Public/Offline.html'
];
self.addEventListener('install', function(event) {
	console.log("Installing service worker");
	//install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
			.catch(function(error) {
				console.log("SW Install event error - " + error);
			})
		);
});

//Activate Service Worker

self.addEventListener('activate', function(event) {
	//console.log("Activating service worker");
	var cacheWhitelist = CACHE_NAME;
	event.waitUntil(
			caches.keys().then(function(keyList) {
				return Promise.all(keyList.map(function(key) {
					//console.log("Key is - " + key);
					if(cacheWhitelist.indexOf(key) === -1) {
						return caches.delete(key);
					}
				}));
			})
		);
	event.waitUntil(clients.claim());	
});

//Return content from cache 

self.addEventListener('fetch', function(event) {
	//console.log("Requesting from fetch - " + event.request.url);
	event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					//Cache hit - return response
					if(response) {
						//console.log("Cache hit");
						return response;
					}
					//console.log("Fetching - " + event.request.url);
					return fetch(event.request);
					/*.then(function(data) {
						console.log("Fetched from server");
					})
					.catch(function(error) {
							console.log("Error is - " + error);
					});*/
				})
				.catch(function(error) {
						console.log("Getting offline html");
						return caches.match(OFFINE_URL);
					})
		);
});