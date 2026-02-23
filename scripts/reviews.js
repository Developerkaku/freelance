(function () {
    // trust component: lazy-load Google Maps iframe and render stars
    const mapContainer = document.getElementById('mapContainer');
    const openMap = document.getElementById('openMap');
    const ratingNumber = document.querySelector('.rating__number');
    const starsSvg = document.querySelector('.stars');

    // Render 5 star SVG with clipping based on average
    function renderStars(avg) {
        const pct = Math.max(0, Math.min(5, parseFloat(avg))) / 5;
        const width = 100; const height = 20;
        const fullStar = `\n      <symbol id="s" viewBox=\"0 0 24 24\">\n        <path d=\"M12 .587l3.668 7.431L24 9.75l-6 5.85L19.335 24 12 19.77 4.665 24 6 15.6 0 9.75l8.332-1.732z\" />\n      </symbol>`;
        const stars = [0, 1, 2, 3, 4].map(i => `<use xlink:href='#s' x='${i * 20}' y='0' width='20' height='20' />`).join('');
        const clipWidth = Math.round(width * pct);
        starsSvg.innerHTML = `<?xml version=\"1.0\"?>\n      <svg viewBox=\"0 0 100 20\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          ${fullStar}\n          <clipPath id=\"clip\">\n            <rect x=\"0\" y=\"0\" width=\"${clipWidth}\" height=\"20\" />\n          </clipPath>\n        </defs>\n        <g fill=\"#E0E6EE\">${stars}</g>\n        <g fill=\"#F5C14A\" clip-path=\"url(#clip)\">${stars}</g>\n      </svg>`;
    }

    // lazy-load iframe (maps embed) when user clicks Open map or when scrolled into view
    function loadMap() {
        if (!mapContainer || mapContainer.dataset.loaded) return;
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3805.79860165093!2d78.549363!3d17.469350999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDI4JzA5LjciTiA3OMKwMzInNTcuNyJF!5e0!3m2!1sen!2sin!4v1770980639687!5m2!1sen!2sin'; // NOTE: replace with full embed URL if available
        iframe.width = '100%'; iframe.height = '100%'; iframe.style.border = '0'; iframe.loading = 'lazy';
        mapContainer.innerHTML = '';
        mapContainer.appendChild(iframe);
        mapContainer.dataset.loaded = 'true';
        mapContainer.setAttribute('aria-hidden', 'false');
        try { window.dataLayer && dataLayer.push({ event: 'trust_map_loaded' }); } catch (e) { }
    }

    openMap.addEventListener('click', function () {
        window.open("https://maps.app.goo.gl/Ejek99a62xU91cHN7");
    });

    // IntersectionObserver: load map when in viewport
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { loadMap(); io.disconnect(); } });
        }, { rootMargin: '200px' });
        io.observe(mapContainer);
    }

    // initialize stars from data attribute
    if (ratingNumber) { renderStars(ratingNumber.dataset ? ratingNumber.dataset.average || ratingNumber.textContent : ratingNumber.textContent); }

})();
