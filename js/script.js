document.addEventListener('DOMContentLoaded', () => {
    // Modal Handling
    const openModalBtn = document.getElementById('open-modal-btn');
    const contactModal = document.getElementById('contact-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const contactForm = document.getElementById('ajukan-form');
    const submitBtn = document.getElementById('submit-form-btn');

    const requiredFields = contactForm ? contactForm.querySelectorAll('[required]') : [];

    function checkFormValidity() {
        const allFilled = Array.from(requiredFields).every(field => field.value.trim());
        submitBtn.disabled = !allFilled;
    }

    if (contactForm) {
        contactForm.addEventListener('input', checkFormValidity);
    }

    if (openModalBtn && contactModal && modalCloseBtn) {
        function toggleModal(open = true) {
            contactModal.classList.toggle('active', open);
            document.body.classList.toggle('no-scroll', open);
            if (open) checkFormValidity();
        }

        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(true);
        });

        modalCloseBtn.addEventListener('click', () => toggleModal(false));

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) toggleModal(false);
        });
    } else if (!contactModal || !openModalBtn || !modalCloseBtn) {
        console.warn('Modal elements missing:', { openModalBtn, contactModal, modalCloseBtn });
    }

    // Slider Handling
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideInterval = 3000;
    let autoSlide;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function updateSlide(index) {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    }

    if (prevBtn && nextBtn && slider && slides.length) {
        startAutoSlide();
        prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    } else {
        console.warn('Slider elements missing or no slides found:', { prevBtn, nextBtn, slider, slides });
    }

    // Toggle Teks Selengkapnya
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const fullTexts = document.querySelectorAll('.full-text');
            const isHidden = fullTexts[0].style.display === 'none' || !fullTexts[0].style.display;
            fullTexts.forEach(text => {
                text.style.display = isHidden ? 'block' : 'none';
            });
            readMoreBtn.textContent = isHidden ? 'Sembunyikan' : '…Selengkapnya';
        });
    } else {
        console.warn('Read more button not found');
    }

    // Animasi Scroll
    const revealableElements = document.querySelectorAll('.revealable');
    if (revealableElements.length) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealableElements.forEach(el => observer.observe(el));
    } else {
        console.warn('No revealable elements found');
    }

    // Sidebar Toggle
    const sidebarToggle = document.querySelector('#sidebar-toggle');
    const sidebar = document.querySelector('#sidebar');
    const closeBtn = document.querySelector('#close-sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar && closeBtn && mainContent) {
        console.log('Sidebar elements found');
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-open');
            console.log('Sidebar toggled');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-open');
            console.log('Sidebar closed');
        });

        // Tambah penutup saat klik di luar sidebar
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-open');
                console.log('Sidebar closed by outside click');
            }
        });
    } else {
        console.warn('Sidebar elements missing:', { sidebarToggle, sidebar, closeBtn, mainContent });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
        faqQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.nextElementSibling;
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            });
        });
    } else {
        console.warn('No FAQ questions found');
    }

    // Accordion untuk Visi, Misi, Struktur, Legalitas
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length) {
        accordionHeaders.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
                const body = item.nextElementSibling;
                body.classList.toggle('active');
                // Tutup accordion lain jika ada
                accordionHeaders.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.nextElementSibling.classList.remove('active');
                    }
                });
            });
        });
    } else {
        console.warn('No accordion headers found');
    }
});
