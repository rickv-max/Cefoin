document.getElementById('hamburger').addEventListener('click', function () {
  const nav = document.getElementById('navLinks'); // ini sesuai dengan HTML kamu
  nav.classList.toggle('active');
});

// Form Modal
document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('open-modal-btn');
const contactModal = document.getElementById('contact-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
  const contactForm = document.getElementById('ajukan-form');
  const submitBtn = document.getElementById('submit-form-btn');
  const requiredFields = contactForm.querySelectorAll('[required]');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slider img');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  const slideInterval = 3000; // Ganti durasi slide otomatis (dalam milidetik, misal 3000 = 3 detik)

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Slide otomatis
  let autoSlide = setInterval(nextSlide, slideInterval);

  // Kontrol manual
  prevBtn.addEventListener('click', () => {
    prevSlide();
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
  });

  // Pause saat hover
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
  });
});
  function checkFormValidity() {
    let allFilled = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) allFilled = false;
    });
    submitBtn.disabled = !allFilled;
  }

  if (contactForm) {
    contactForm.addEventListener('input', checkFormValidity);
  }

  if (openModalBtn && contactModal && modalCloseBtn) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
      document.body.classList.add('no-scroll');
      checkFormValidity();
    });

    modalCloseBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
});

// Animasi scroll
const revealableElements = document.querySelectorAll('.revealable');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealableElements.forEach(el => observer.observe(el));

function toggleMenu() {
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.toggle("active");
    }

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});
// Accordion untuk Visi, Misi, Struktur, Legalitas
document.querySelectorAll(".accordion-header").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    const body = item.nextElementSibling;
    body.classList.toggle("active");
  });
});
