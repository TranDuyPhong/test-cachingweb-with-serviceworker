if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw_cached_pages.js')
        .then(res => console.log('Server worker registered successfully', res))
        .catch(err => console.error('Server worker register failed', err));
    });
}