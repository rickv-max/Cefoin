// JavaScript untuk Pop-up Modal (Formulir Kontak)
const openModalBtn = document.getElementById('open-modal-btn');
const contactModal = document.getElementById('contact-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');

if (openModalBtn && contactModal && modalCloseBtn) {
    // Fungsi untuk membuka modal
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah scrolling ke # jika href="#"
        contactModal.classList.add('active');
        document.body.classList.add('no-scroll'); // Mencegah scrolling body
    });

    // Fungsi untuk menutup modal
    modalCloseBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Mengizinkan scrolling body
    });

    // Menutup modal saat mengklik di luar area konten modal
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) { // Jika target klik adalah overlay itu sendiri
            contactModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
} else {
    console.warn("Error: Elemen untuk modal tidak ditemukan. Pastikan ID 'open-modal-btn', 'contact-modal', dan class 'modal-close-btn' sudah benar di HTML.");
}


// JavaScript untuk Animasi Reveal on Scroll
const revealableElements = document.querySelectorAll('.revealable');

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
