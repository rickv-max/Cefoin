// JavaScript untuk Hamburger Menu
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Fungsi untuk toggle menu
function toggleMenu() {
    navLinks.classList.toggle('active');
    // document.body.classList.toggle('no-scroll'); // Opsional: untuk mencegah scrolling body saat menu mobile terbuka
}

// Tambahkan event listener ke tombol hamburger
if (hamburger && navLinks) {
    hamburger.addEventListener('click', toggleMenu);

    // Menutup menu saat salah satu link diklik (untuk pengalaman mobile yang lebih baik)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Tutup menu hanya jika di layar kecil (lebar kurang dari atau sama dengan 768px)
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                // document.body.classList.remove('no-scroll'); 
            }
        });
    });
} else {
    // Pesan ini akan muncul di console browser jika ada masalah dengan ID
    console.warn("Error: Elemen dengan ID 'hamburger-menu' atau 'nav-links' tidak ditemukan. Pastikan ID di HTML sudah benar.");
}


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
