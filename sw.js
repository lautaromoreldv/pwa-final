var cacheName = 'cache - Final remeras';

self.addEventListener('install', function(event) {
	self.skipWaiting();
	console.log('el sw fue actualizado');
	event.waitUntil(	
		caches.open(cacheName)
			.then(function(cache){
				cache.addAll(
						['index.html',
						'css/estilo.css',
						'css/bootstrap.css',
						'css/materialdesignicons.css',
						'css/materialicons.css',
						'css/roboto.css',
						'css/vuetify.min.css',
						'manifest.json',
						'favicon.ico',
						'js/bootstrap.bundle.js',
						'js/jquery-3.4.1.js',
						'js/vue-router.js',
						'js/vue.js',
						'js/vuetify.js',
						'abm.js',
						'index.js',
						'application.js',
						'img/akom.jpg',
						'img/banner2.jpg',
						'img/carrito.png',
						'img/icon.jpg',
						'img/inicios.png',
						'img/logo0.png',
						'img/queen1976_1.jpg',
						'img/queen1976.png',
						'img/queenend.jpg',
						'img/queenend2.jpg',
						'img/queenend4.jpg',
						'img/discos/a day at the races.jpg',
						'img/discos/a kind of magic.jpg',
						'img/discos/a night at the opera.jpg',
						'img/discos/hotspace.jpg',
						'img/discos/innuendo.jpg',
						'img/discos/jazz.jpg',
						'img/discos/news of the world.jpg',
						'img/discos/queen.jpg',
						'img/discos/queenii.jpg',
						'img/discos/sheer heart attack.jpg',
						'img/discos/the game.jpg',
						'img/discos/the works.jpg',
						'img/discos/the_miracle.jpg',
						'img/icons/icon-192x192.png',
						'img/icons/icon-256x256.png',
						'img/icons/icon-384x384.png',
						'img/icons/icon-512x512.png',
						'img/integrantes/brian1.jpg',
						'img/integrantes/brian2.jpg',
						'img/integrantes/brian3.jpg',
						'img/integrantes/freddie1.jpg',
						'img/integrantes/freddie2.jpg',
						'img/integrantes/freddie3.jpg',
						'img/integrantes/john1.jpg',
						'img/integrantes/john2.jpg',
						'img/integrantes/john3.jpg',
						'img/integrantes/roger1.jpg',
						'img/integrantes/roger2.jpg',
						'img/integrantes/roger3.jpg',
						'img/tienda/brian.jpg',
						'img/tienda/flash_gordon.png',
						'img/tienda/freddie_wembley.jpg',
						'img/tienda/freddie.jpg',
						'img/tienda/john.jpg',
						'img/tienda/newsoftheworld.jpg',
						'img/tienda/nombres.jpg',
						'img/tienda/queen_opera.jpg',
						'img/tienda/queen_vintage.jpg',
						'img/tienda/roger.jpg',
						'img/tienda/sudamerica_81.jpg',
						'img/tienda/thegame.png'
						]
				)
			})
	);
});

self.addEventListener('activate', function (event) {
	console.log('SW activado'); 
});

self.addEventListener('install', function (event){
	self.skipWaiting();
	console.log('el sw fue actualizado');
})

self.addEventListener('fetch', function(event) { 
	event.respondWith( 
		caches.match(event.request) 
			.then(function(response) {
				if (response) { 
					return response;
			}
		return fetch(event.request); 
	}));
});