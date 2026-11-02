const CACHE_NAME = 'ps-host-v1';
const FILES_TO_CACHE = [
    './',
    './index.html'
    // أضف هنا أسماء كافة ملفات الـ Payloads الثغرات بعد رفعها للمستودع
];

// التثبيت والتخزين
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('جاري حفظ الملفات في الذاكرة...');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// الاستجابة من التخزين أوفلاين
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
