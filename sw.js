const NOM = 'romeo-v1';
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(r){
      if (r && r.ok) { var c = r.clone(); caches.open(NOM).then(function(k){ k.put(e.request, c); }); }
      return r;
    }).catch(function(){ return caches.match(e.request, { ignoreSearch: true }); })
  );
});
