// JavaScript untuk Hamburger Menu
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Tutup menu hanya jika di layar kecil
            navLinks.classList.remove('active');
        }
    });
});

// JavaScript untuk Animasi Reveal on Scroll
const revealableElements = document.querySelectorAll('.revealable');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Jika elemen masuk viewport
            entry.target.classList.add('revealed');
        } else {
            // Opsional: Jika elemen keluar viewport, reset untuk bisa di-reveal lagi
            // entry.target.classList.remove('revealed');
        }
    });
}, {
    threshold: 0.2 // Berapa persen elemen harus terlihat untuk di-reveal (20%)
});

revealableElements.forEach(element => {
    observer.observe(element);
});

// Tambahan untuk item layanan agar muncul satu per satu (staggered)
const layananGrid = document.querySelector('.layanan-grid');
if (layananGrid) { // Pastikan elemen grid ada
    const layananObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = 0;
                // Ambil item anak dari grid
                Array.from(entry.target.children).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, delay);
                    delay += 150; // Tambah delay untuk efek staggered
                });
                observer.unobserve(entry.target); // Hentikan observasi setelah di-reveal
            }
        });
    }, {
        threshold: 0.1 // Ketika 10% dari grid terlihat
    });
    layananObserver.observe(layananGrid);
}
