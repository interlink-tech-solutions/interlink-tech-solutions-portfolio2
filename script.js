const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
$$(".nav-links a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

// Header + scroll progress
const header = $(".site-header");
const progress = $("#scrollProgress");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});

// Reveal-on-scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
$$(".reveal").forEach(el => observer.observe(el));

// Simple typewriter
const words = ["websites", "software", "dashboards", "digital solutions"];
let wi = 0, ci = 0, deleting = false;
const typed = $("#typed");
function typeLoop() {
  const word = words[wi];
  typed.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  let delay = deleting ? 55 : 85;
  if (!deleting && ci === word.length) { delay = 1100; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 300; }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 800);

// Project galleries
const galleries = {
  inventory: {
    title: "Inventory Management System",
    images: [
      ["assets/projects/inventory-main.jpg", "Main dashboard"],
      ["assets/projects/inventory-orders.jpg", "Orders and billing"],
      ["assets/projects/inventory-login.jpg", "Login screen"]
    ]
  },
  cms: {
    title: "College Management System",
    images: [
      ["assets/projects/cms-students.jpg", "Students management"],
      ["assets/projects/cms-departments.jpg", "Departments"],
      ["assets/projects/cms-dashboard.jpg", "Dashboard"]
    ]
  },
  abiel: { title: "Abiel Aquarium Website", images: [["assets/website-projects/abiel-aquarium-about.jpg", "About page"], ["assets/website-projects/abiel-aquarium-philosophy.jpg", "Core philosophy section"]] },
  spadeals: { title: "Spadeals E-commerce Website", images: [["assets/website-projects/spadeals-home.jpg", "E-commerce homepage"]] },
  dabjo: {
    title: "DABJO Business Solutions Website",
    images: [
      ["assets/website-projects/dabjo-logistics.jpg", "Logistics & Supply Chain page"],
      ["assets/website-projects/dabjo-contact.jpg", "Contact page"],
      ["assets/website-projects/dabjo-about.jpg", "About Us page"]
    ]
  },
  hotel: {
    title: "Hotel Management System",
    images: [
      ["assets/projects/hotel-reservations.jpg", "Reservations"],
      ["assets/projects/hotel-staff.jpg", "Staff management"],
      ["assets/projects/hotel-login.jpg", "Account login"],
      ["assets/projects/hotel-rooms.jpg", "Rooms management"]
    ]
  }
};

const modal = $("#galleryModal"), modalImg = $("#galleryImage"), modalTitle = $("#modalTitle");
const galleryCount = $("#galleryCount"), thumbs = $("#thumbs");
let currentGallery = null, currentIndex = 0;

function renderGallery() {
  const data = galleries[currentGallery];
  const item = data.images[currentIndex];
  modalTitle.textContent = data.title;
  modalImg.src = item[0];
  modalImg.alt = `${data.title} — ${item[1]}`;
  galleryCount.textContent = `${currentIndex + 1} / ${data.images.length}`;
  thumbs.innerHTML = "";
  data.images.forEach((img, i) => {
    const b = document.createElement("button");
    b.className = i === currentIndex ? "active" : "";
    b.innerHTML = `<img src="${img[0]}" alt="${img[1]}">`;
    b.addEventListener("click", () => { currentIndex = i; renderGallery(); });
    thumbs.appendChild(b);
  });
}

function openGallery(key) {
  currentGallery = key; currentIndex = 0;
  renderGallery();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeGallery() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
$$(".gallery-btn").forEach(btn => btn.addEventListener("click", () => openGallery(btn.dataset.gallery)));
$("#modalClose").addEventListener("click", closeGallery);
$("#modalBackdrop").addEventListener("click", closeGallery);
$("#prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleries[currentGallery].images.length) % galleries[currentGallery].images.length;
  renderGallery();
});
$("#nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleries[currentGallery].images.length;
  renderGallery();
});
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") $("#prevBtn").click();
  if (e.key === "ArrowRight") $("#nextBtn").click();
});

// Contact form -> WhatsApp
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const subject = $("#subject").value;
  const message = $("#message").value.trim();
  const text = `Hello Aderibigbe,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AProject: ${encodeURIComponent(subject)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
  window.open(`https://wa.me/2348102483702?text=${text}`, "_blank", "noopener");
});

// Current year
$("#year").textContent = new Date().getFullYear();
