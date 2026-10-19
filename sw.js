/* LOM Demo · funciona sin conexión: guarda el programa y los datos la primera vez */
const V='lom-demo-v1',F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','data/vista3d.png',
 'data/LOM_FY27_MA_BD_solidos.json','data/LOM_FY27_MB_BD_solidos.json','data/LOM_FY27_MC_BD_solidos.json','data/TOPO_MB.json','data/TOPO_MC.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(x=>{if(x.ok&&new URL(e.request.url).origin===location.origin){const c=x.clone();caches.open(V).then(k=>k.put(e.request,c));}return x;})));});
