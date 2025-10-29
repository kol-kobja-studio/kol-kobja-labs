// Reveal animations when scrolling into view
const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

cards.forEach(card => observer.observe(card));
