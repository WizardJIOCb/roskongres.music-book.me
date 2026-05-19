const header = document.querySelector("[data-header]");
const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");
const revealTargets = document.querySelectorAll(
  ".section-heading, .intro-grid article, .split > *, .product-strip article, .nominations .tabs, .tab-panels, .proof > *, .story > *, .application-grid article, .cta-panel"
);

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function activateTab(name) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === name;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === name);
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
