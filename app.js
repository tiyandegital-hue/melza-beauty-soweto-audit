/* Melza Beauty Spa — Audit Dossier
   Business name is ONE swappable constant. Change BUSINESS_NAME below
   and every [data-biz] element on every page updates. */
const BUSINESS_NAME = "Melza Beauty Spa";

document.documentElement.classList.add("js");

document.querySelectorAll("[data-biz]").forEach((el) => {
  el.textContent = BUSINESS_NAME;
});

/* ---------- Mobile nav ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Entrance reveals (rest state visible with JS off) ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ---------- Fresha comparison bars animate on scroll into view ---------- */
const bars = document.querySelectorAll(".bar-fill");
if (bars.length && "IntersectionObserver" in window && !reduceMotion) {
  const bio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          bio.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((bar) => bio.observe(bar));
} else {
  bars.forEach((bar) => bar.classList.add("in"));
}

/* ---------- Findings filters ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const findingCards = document.querySelectorAll(".finding-card");
const filterNote = document.querySelector(".filter-note");
if (filterButtons.length && findingCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const filter = btn.dataset.filter;
      let shown = 0;
      findingCards.forEach((card) => {
        const cats = (card.dataset.cat || "").split(" ");
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) shown += 1;
      });
      if (filterNote) {
        if (filter === "all") {
          filterNote.hidden = true;
        } else {
          filterNote.hidden = false;
          filterNote.textContent =
            "Showing " + shown + " of 8 findings — " + btn.textContent.trim();
        }
      }
    });
  });
}
