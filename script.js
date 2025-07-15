// JavaScript untuk Animasi Reveal on Scroll
const revealableElements = document.querySelectorAll('.revealable');

// Fungsi callback untuk Intersection Observer
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); 
        } else {
            // entry.target.classList.remove('revealed'); // Opsional: reset saat keluar viewport
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.2
});

revealableElements.forEach(element => {
    observer.observe(element);
});

// Tambahan untuk item layanan agar muncul satu per satu (staggered)
const layananGrid = document.querySelector('.layanan-grid');
if (layananGrid) {
    const layananObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = 0;
                Array.from(entry.target.children).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, delay);
                    delay += 150;
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    layananObserver.observe(layananGrid);
}
