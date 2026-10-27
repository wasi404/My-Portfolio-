     // ===== 1. MOBILE MENU =====
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function setMenu(open) {
      navMenu.classList.toggle("open", open);
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    }

    hamburger.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
    navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

    // ===== 2. NAVBAR STYLE ON SCROLL =====
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    // ===== 3. ACTIVE NAV LINK (SCROLL SPY) =====
    const sections = document.querySelectorAll("main section[id]");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => spy.observe(section));

    // ===== 4. TYPING ANIMATION =====
    const roles = ["Frontend Developer", "Full-Stack Learner", "Problem Solver", "CS Student"];
    const typedEl = document.getElementById("typed-text");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let roleIndex = 0, charIndex = 0, deleting = false;

    function type() {
      const current = roles[roleIndex];
      typedEl.textContent = current.substring(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 90);
      } else if (!deleting) {
        deleting = true;
        setTimeout(type, 1500);
      } else if (charIndex > 0) {
        charIndex--;
        setTimeout(type, 45);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 350);
      }
    }
    if (reduceMotion) typedEl.textContent = roles[0];
    else type();

    // ===== 5. FADE-IN ON SCROLL + SKILL BARS =====
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");

        const fill = entry.target.querySelector(".bar-fill");
        if (fill) fill.style.width = fill.dataset.level + "%";

        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((el) => {
      const position = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty("--delay", Math.min(position, 4) * 90 + "ms");
      revealObserver.observe(el);
    });

    // ===== 6. CONTACT FORM VALIDATION (frontend only) =====
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");

    function showError(input, message) {
      input.parentElement.classList.toggle("invalid", Boolean(message));
      document.getElementById(input.id + "-error").textContent = message;
      input.setAttribute("aria-invalid", String(Boolean(message)));
    }

    function validateField(input) {
      const value = input.value.trim();
      let message = "";

      if (input.id === "name") {
        if (value.length < 2) message = "Please enter your name (at least 2 characters).";
      } else if (input.id === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Please enter a valid email address.";
      } else if (input.id === "message") {
        if (value.length < 10) message = "Message should be at least 10 characters.";
      }

      showError(input, message);
      return !message;
    }

    const fields = form.querySelectorAll("input, textarea");
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        statusEl.textContent = "";
        if (field.parentElement.classList.contains("invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "";

      const allValid = [...fields].map(validateField).every(Boolean);
      if (!allValid) {
        form.querySelector(".invalid input, .invalid textarea").focus();
        return;
      }

      // Frontend-only: no data is sent anywhere.
      // To make it work, connect a backend or a form service (e.g. Formspree, EmailJS).
      statusEl.textContent = "✓ Validation passed! (Demo only: no message was actually sent.)";
      form.reset();
    });

    // ===== 7. FOOTER YEAR =====
    document.getElementById("year").textContent = new Date().getFullYear();
  




    
/* Footer Current Date & Time — Bangladesh */
const dateElement = document.getElementById("current-date");
const timeElement = document.getElementById("current-time");

function updateDateTime() {
  const now = new Date();

  dateElement.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now);

  timeElement.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);
}

updateDateTime();
setInterval(updateDateTime, 1000);
