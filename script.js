// ─── CAROUSEL INIT ─────────────────────────────────────────────────
// carouselGoTo / carouselNext / carouselPrev / setLang are defined
// inline in <head> of index.html so onclick attributes always find them.

document.addEventListener("DOMContentLoaded", function () {
  // Init all carousels
  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var id = carousel.id;
    var slides = carousel.querySelectorAll(".carousel-slide");
    carouselState[id] = 0;
    slides.forEach(function (s, i) {
      s.style.left = i * 100 + "%";
    });
    carouselGoTo(id, 0);
  });

  // Restore saved language preference
  var saved = localStorage.getItem("portfolio-lang");
  if (saved) setLang(saved);

  // ─── SCROLL REVEAL ───────────────────────────────────────────────
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(
      ".skill-block, .project-card, .timeline-item, .lang-pill, .interest-chip, .contact-link"
    )
    .forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      revealObserver.observe(el);
    });

  // ─── ACTIVE NAV LINK ON SCROLL ───────────────────────────────────
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.style.color =
              link.getAttribute("href") === "#" + entry.target.id
                ? "var(--accent)"
                : "";
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach(function (s) {
    navObserver.observe(s);
  });
});
