document.addEventListener('DOMContentLoaded', () => {
  // Modal Handling
  const openModalBtn = document.getElementById('open-modal-btn');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const contactForm = document.getElementById('ajukan-form');
  const submitBtn = document.getElementById('submit-form-btn');
  const requiredFields = contactForm ? contactForm.querySelectorAll('[required]') : [];

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

  // Slider Handling
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slider img');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  const slideInterval = 3000;

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

  let autoSlide = setInterval(nextSlide, slideInterval);

  if (prevBtn && nextBtn && slider) {
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

    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(nextSlide, slideInterval);
    });
  }

  
  // Toggle Teks Selengkapnya
const readMoreBtn = document.querySelector('.read-more-btn');
if (readMoreBtn) {
  readMoreBtn.addEventListener('click', () => {
    const fullText = readMoreBtn.previousElementSibling;
    if (fullText.style.display === 'none') {
      fullText.style.display = 'inline';
      readMoreBtn.textContent = 'Sembunyikan';
    } else {
      fullText.style.display = 'none';
      readMoreBtn.textContent = 'Selengkapnya';
    }
  });
}

  // Animasi Scroll
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

  // Toggle Menu
  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Accordion untuk Visi, Misi, Struktur, Legalitas
  document.querySelectorAll('.accordion-header').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const body = item.nextElementSibling;
      body.classList.toggle('active');
    });
  });
});
