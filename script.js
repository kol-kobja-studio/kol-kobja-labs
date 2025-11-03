const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// === THEME DETECTION & TOGGLE ===
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

// === PAGE TRANSITION EFFECT ===
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const url = new URL(link.href);
    const isInternal = url.hostname === window.location.hostname;

    if (isInternal) {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("target") === "_blank") return;
        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");
        setTimeout(() => (window.location.href = link.href), 300);
      });
    }
  });
});
