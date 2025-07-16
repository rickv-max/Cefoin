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

    document.addEventListener("DOMContentLoaded", function () {
      const navItems = document.querySelectorAll(".nav-links li a");
      const sections = ["layanan", "program", "tim"];

      navItems.forEach(item => {
        item.addEventListener("click", (e) => {
          const target = item.getAttribute("href").substring(1);

          // Sembunyikan semua yang ada di daftar
          sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.style.display = "none";
          });

          // Tampilkan hanya bagian yang diklik
          const selected = document.getElementById(target);
          if (selected) {
            selected.style.display = "block";
            selected.scrollIntoView({ behavior: "smooth" });
          }

          // Tutup menu mobile
          document.getElementById("navLinks").classList.remove("active");
        });
      });
    });
