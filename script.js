document.getElementById('hamburger').addEventListener('click', function () {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('active');
});

// JavaScript untuk Pop-up Modal (Formulir Kontak)
const openModalBtn = document.getElementById('open-modal-btn');
const contactModal = document.getElementById('contact-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Referensi ke elemen form dan input
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-form-btn');
// Mengumpulkan semua field yang memiliki atribut 'required'
const requiredFields = contactForm ? contactForm.querySelectorAll('[required]') : [];

// Fungsi untuk mengecek validasi form dan mengaktifkan/menonaktifkan tombol submit
function checkFormValidity() {
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
        // field.value.trim() digunakan untuk menghapus spasi di awal/akhir dan mengecek apakah kosong
        if (!field.value.trim()) { 
            allFieldsFilled = false;
        }
    });
    if (submitBtn) {
        submitBtn.disabled = !allFieldsFilled; // Aktifkan tombol jika semua field terisi
    }
}

// Jalankan pengecekan validasi saat halaman dimuat (agar tombol awalnya disabled)
document.addEventListener('DOMContentLoaded', checkFormValidity);

// Tambahkan event listener untuk setiap input yang berubah atau diketik
if (contactForm) {
    contactForm.addEventListener('input', checkFormValidity);
}

if (openModalBtn && contactModal && modalCloseBtn) {
    // Fungsi untuk membuka modal
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah scrolling ke # jika href="#"
        contactModal.classList.add('active');
        document.body.classList.add('no-scroll'); // Mencegah scrolling body
        checkFormValidity(); // Panggil lagi pengecekan saat modal dibuka
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
    console.warn("Error: Elemen untuk modal (open-modal-btn, contact-modal, atau modal-close-btn) tidak ditemukan. Pastikan ID/Class HTML sudah benar.");
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
