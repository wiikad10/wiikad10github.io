document.addEventListener("DOMContentLoaded", () => {

  /* ============ Theme toggle (light / dark) ============ */
  const themeBtn = document.getElementById("theme-btn");
  const body = document.body;

  const setTheme = (dark) => {
    body.classList.toggle("dark", dark);
    themeBtn.classList.toggle("fa-moon", !dark);
    themeBtn.classList.toggle("fa-sun", dark);
  };

  // Respect the visitor's OS preference on first load.
  setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

  themeBtn.addEventListener("click", () => {
    setTheme(!body.classList.contains("dark"));
  });

  /* ============ Mobile nav ============ */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("fa-bars", !open);
    menuBtn.classList.toggle("fa-xmark", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.add("fa-bars");
      menuBtn.classList.remove("fa-xmark");
    });
  });

  /* ============ Navbar background on scroll ============ */
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ============ Active nav link on scroll ============ */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ============ Typing effect ============ */
  const typingEl = document.getElementById("typing");
  const roles = [
    "Front-End Developer",
    "OFPPT Student",
    "Web Enthusiast",
    "Future Full-Stack Dev"
  ];

  if (typingEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(tick, deleting ? 40 : 80);
    };

    tick();
  }

  /* ============ Scroll reveal ============ */
  const revealTargets = document.querySelectorAll(
    ".about-container, .skills, .projects-container .card, form, .section-title"
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ============ Animated skill bars ============ */
  const skillBars = document.querySelectorAll(".skill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const skill = entry.target;
        const percentLabel = skill.querySelector(".skill-info span:last-child");
        const progress = skill.querySelector(".progress");
        const target = parseInt(percentLabel.textContent, 10) || 0;

        progress.style.width = `${target}%`;
        skillObserver.unobserve(skill);
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((skill) => skillObserver.observe(skill));

  /* ============ Back to top button ============ */
  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 400);
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============ Contact form (front-end only demo) ============ */
  const form = document.querySelector("#contact form");

  if (form) {
    const note = document.createElement("p");
    note.className = "form-note";
    form.appendChild(note);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.textContent = "Message ready — connect a backend or form service to actually send it.";
      form.reset();
    });
  }

});
