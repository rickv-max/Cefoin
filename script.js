function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function openForm() {
  document.getElementById("formModal").style.display = "block";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("formModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function validateForm() {
  const nama = document.getElementById("nama").value.trim();
  const domisili = document.getElementById("domisili").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const subjek = document.getElementById("subjek").value.trim();
  const masalah = document.getElementById("masalah").value.trim();

  if (!nama || !domisili || !telepon || !subjek || !masalah) {
    alert("Semua kolom wajib diisi!");
    return false;
  }

  alert("Formulir berhasil dikirim. Terima kasih atas kepercayaan Anda!");
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-links li a");
  const sections = ["layanan", "program", "tim"];

  navItems.forEach(item => {
    item.addEventListener("click", function(e) {
      const target = item.getAttribute("href").substring(1);
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });
      const targetEl = document.getElementById(target);
      if (targetEl) {
        targetEl.style.display = "block";
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
