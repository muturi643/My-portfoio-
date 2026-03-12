/* =========================
   MOBILE NAV TOGGLE
========================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Close menu on link click (mobile) */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================
   THEME TOGGLE (SYSTEM / LIGHT / DARK)
========================= */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Define states
const themes = ["system", "light", "dark"];
const themeIcons = { system: "💻", light: "☀️", dark: "🌙" };

// Get saved theme or default to system
let currentTheme = localStorage.getItem("theme") || "system";

function applyTheme(themeState) {
  body.classList.remove("light", "dark");
  
  if (themeState === "system") {
    // Check OS preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!prefersDark) {
      body.classList.add("light");
    }
  } else if (themeState === "light") {
    body.classList.add("light");
  } 
  // If 'dark', no class is needed since dark is default in CSS

  // Update button icon
  themeToggle.textContent = themeIcons[themeState];
}

// Initial application
applyTheme(currentTheme);

// Handle toggle click
themeToggle.addEventListener("click", () => {
  // Cycle to next theme
  let currentIndex = themes.indexOf(currentTheme);
  let nextIndex = (currentIndex + 1) % themes.length;
  currentTheme = themes[nextIndex];
  
  // Save & Apply
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
});

// Listen for OS theme changes while in "system" mode
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (currentTheme === "system") {
    applyTheme("system");
  }
});