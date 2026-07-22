/* ===========================
   JPB Portfolio — script.js
   =========================== */

/* ---- DARK MODE ---- */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ---- SCROLL PROGRESS ---- */
const scrollBar = document.getElementById('scroll-bar');
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  scrollBar.style.width = ((scrolled / total) * 100) + '%';
  navbar.classList.toggle('scrolled', scrolled > 10);
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ---- REVEAL ANIMATION ON SCROLL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) mobileMenu.classList.remove('open');
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* ---- TERMINAL ANIMATION ---- */
let terminalAnimated = false;

const termLines = [
  { delay: 0,    type: 'prompt', text: 'C:\\Users\\JhonPaul> ' , cmd: 'loading_skills.bat' },
  { delay: 700,  type: 'out',    text: '' },
  { delay: 750,  type: 'comment',text: ':: Initializing skill modules...' },
  { delay: 1200, type: 'warn',   text: '[NETWORKING]  Router Config · Subnetting · VLAN · DHCP/Static IP' },
  { delay: 1700, type: 'warn',   text: '[PROGRAMMING] Python · C# · Java · PHP · MySQL · HTML/CSS/JS' },
  { delay: 2200, type: 'warn',   text: '[SUPPORT]     Troubleshooting · Software Install · MS Office' },
  { delay: 2700, type: 'out',    text: '' },
  { delay: 3200, type: 'out',    text: 'All modules loaded. Status: OK' },
  { delay: 3700, type: 'prompt', text: 'C:\\Users\\JhonPaul> ', cmd: '', cursor: true },
];

function runTerminalAnimation() {
  const body = document.getElementById('terminal-body');
  body.innerHTML = '';

  termLines.forEach(({ delay, type, text, cmd, cursor }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      if (type === 'prompt') {
        line.innerHTML = `<span class="t-ps1">${text}</span><span class="t-input">${cmd || ''}</span>${cursor ? '<span class="t-cursor"></span>' : ''}`;
      } else if (type === 'out') {
        line.innerHTML = `<span class="t-out">${text}</span>`;
      } else if (type === 'warn') {
        line.innerHTML = `<span class="t-warn">${text}</span>`;
      } else if (type === 'comment') {
        line.innerHTML = `<span class="t-comment">${text}</span>`;
      }
      body.appendChild(line);
    }, delay);
  });
}

// Trigger terminal animation when the skills section scrolls into view
const skillsSection = document.getElementById('skills');
const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !terminalAnimated) {
      setTimeout(runTerminalAnimation, 200);
      terminalAnimated = true;
    }
  });
}, { threshold: 0.2 });

terminalObserver.observe(skillsSection);

/* ---- PROJECT FILTER ---- */
const filterPills = document.querySelectorAll('.filter-pill');
filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.hidden = !show;
    });
  });
});

/* ---- TECH BREAKDOWN TOGGLE ---- */
function toggleBreakdown(id, btn) {
  const el = document.getElementById(id);
  const open = el.classList.toggle('open');
  btn.textContent = open ? 'Hide Details ↑' : 'Tech Details ↓';
}

/* ---- CONTACT FORM ---- */
function handleSubmit() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-message').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in all required fields.');
    return;
  }
  document.getElementById('f-name').value = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-subject').value = '';
  document.getElementById('f-message').value = '';
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}