const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");
const copyButton = document.querySelector("[data-copy]");
const revealTargets = document.querySelectorAll("[data-reveal]");

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

copyButton?.addEventListener("click", async () => {
  const value = copyButton.getAttribute("data-copy");
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    const originalText = copyButton.textContent;
    copyButton.textContent = "已复制邮箱";
    window.setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1400);
  } catch {
    window.location.href = `mailto:${value}`;
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
