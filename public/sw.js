const CACHE_VERSION = 'spinal-cord-explorer-v11';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
];

const LOCAL_VECTOR_AND_MEDIA_ASSETS = [
  '/Anterior and posterior spinocerebellar tracts.svg',
  '/Corticospinal tracts.svg',
  '/Cross section of spinal cord.svg',
  '/dcml-pathway.png',
  '/Dorsal column-medial lemniscus.svg',
  '/Lateral spinothalamic tract.svg',
  '/lateral-spinothalamic.png',
  '/Lumbar puncture.svg',
  '/Spinal cord.svg',
  '/spinocerebellar.png',
  '/Ventral spinothalamic tract.svg',
  '/ventral-spinothalamic.png',
  '/audio/Spinalvideo.mp4',
  '/Images/dcml/balance-inputs.jpeg',
  '/Images/dcml/sensory-vs-cerebellar-ataxia.png',
  '/assets/Anterior and posterior spinocerebellar tract animation.html',
  '/assets/Anterior and posterior spinocerebellar tracts for animation.svg',
  '/assets/Corticobular tract for animation.svg',
  '/assets/Corticospinal tract animation.html',
  '/assets/Corticospinal tract animation1.html',
  '/assets/Corticospinal tracts for animation.svg',
  '/assets/Cross section of spinal cord for animation.svg',
  '/assets/Cross section of spinal cord for animation1.svg',
  '/assets/DCMLnew.html',
  '/assets/DCMLnewwithcameramovments1.html',
  '/assets/DCMLpathwaywithcameramovments.html',
  '/assets/Dorsal column medial lemniscusAsset 26.html',
  '/assets/Dorsal column medial lemniscusAsset 26.svg',
  '/assets/Dorsal column medial lemniscusAsset 27.html',
  '/assets/Dorsal column medial lemniscusAsset 28.html',
  '/assets/Dorsal column medial lemniscusAsset 30.html',
  '/assets/Dosal column medial lemniscus with camera with spinal cord changed.html',
  '/assets/Dosal column medial lemniscus with camera.html',
  '/assets/Lateral spinothalamic tract animation.html',
  '/assets/Lateral spinothalamic tract animation1.html',
  '/assets/Lateral spinothalamic tract animation2.html',
  '/assets/Lateral spinothalamic tract animation3.html',
  '/assets/Lateral spinothalamic tract for animation with labels.svg',
  '/assets/Ventral spinothalamic tract animation.html',
  '/assets/Ventral spinothalamic tract for animation.svg',
  '/assets/audio/Corticobulbar tract audio.mp3',
  '/assets/audio/Corticospinal tract audio.mp3',
  '/assets/audio/Dorsal column medial lemniscus pathway.mp3',
  '/assets/audio/Lateral spinothalamic tract audio.mp3',
  '/assets/audio/Spinocerebellar tracts audio.mp3',
  '/assets/audio/Ventral spinothalamic tract audio.mp3',
  '/audio/motor-file.mp3',
  '/audio/sensory-file.mp3',
];

const EXTERNAL_DEPENDENCIES = [
  'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
  'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
  'http://maxwellito.github.io/vivus/dist/vivus.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const shellCache = await caches.open(APP_SHELL_CACHE);
      await Promise.allSettled(
        [...APP_SHELL_ASSETS, ...LOCAL_VECTOR_AND_MEDIA_ASSETS].map((asset) => shellCache.add(asset)),
      );

      const runtimeCache = await caches.open(RUNTIME_CACHE);
      await Promise.allSettled(
        EXTERNAL_DEPENDENCIES.map((asset) =>
          runtimeCache.add(new Request(asset, { mode: 'no-cors' })),
        ),
      );

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => ![APP_SHELL_CACHE, RUNTIME_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  const response = await fetch(request);
  const cache = await caches.open(RUNTIME_CACHE);
  cache.put(request, response.clone());
  return response;
}

async function navigationFallback(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match('/index.html');
  }
}

async function rangeResponse(request) {
  const rangeHeader = request.headers.get('range');
  const cacheKey = new URL(request.url).pathname;
  const cachedResponse = await caches.match(cacheKey);

  if (!cachedResponse || !rangeHeader) return fetch(request);

  const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader);
  if (!match) return new Response(null, { status: 416 });

  const videoBuffer = await cachedResponse.arrayBuffer();
  const start = Number(match[1]);
  const requestedEnd = match[2] ? Number(match[2]) : videoBuffer.byteLength - 1;
  const end = Math.min(requestedEnd, videoBuffer.byteLength - 1);

  if (start > end || start >= videoBuffer.byteLength) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${videoBuffer.byteLength}` },
    });
  }

  const headers = new Headers(cachedResponse.headers);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Content-Range', `bytes ${start}-${end}/${videoBuffer.byteLength}`);

  return new Response(videoBuffer.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers,
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(navigationFallback(request));
    return;
  }

  if (request.headers.has('range')) {
    event.respondWith(rangeResponse(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
