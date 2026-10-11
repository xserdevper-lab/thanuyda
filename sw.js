const CACHE_PREFIX='thanuyda-app-';
const CACHE=CACHE_PREFIX+'v7';
const ASSETS=['./','./index.html','./style.css?v=7','./app.js?v=7','./pdf.js?v=7','./install.js?v=7','./manifest.webmanifest','./assets/Sarabun-Regular.ttf','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith(fetch(request).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}
  return response;
 }).catch(async()=>{
  const cached=await caches.match(request);if(cached)return cached;
  if(request.mode==='navigate')return caches.match('./index.html');
  return Response.error();
 }));
});

