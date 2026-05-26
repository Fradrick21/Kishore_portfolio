// Custom cursor disabled - using default browser cursor

// Remove legacy cursor hover references (ring was removed when custom cursor disabled)
// Add tilt interaction for project cards further below.

const hamburger = document.getElementById('navHamburger');
const drawer = document.getElementById('navDrawer');

function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal,.stag-c').forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById('projectLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openProjectOutput(button) {
  const img = button.querySelector('img');
  const title = button.dataset.title || 'Project Output';

  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = img ? img.alt : title;
  lightboxTitle.textContent = title;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeProjectOutput() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxImage.src = '';
}

document.querySelectorAll('.project-output').forEach(button => {
  button.addEventListener('click', () => openProjectOutput(button));
});

lightboxClose.addEventListener('click', closeProjectOutput);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeProjectOutput();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeProjectOutput();
  }
  if (event.key === 'Escape' && caseModal.classList.contains('open')) {
    closeCaseStudy();
  }
});

const caseModal = document.getElementById('caseModal');
const caseTitle = document.getElementById('caseTitle');
const caseDesc = document.getElementById('caseDesc');
const caseDetails = document.getElementById('caseDetails');
const caseTags = document.getElementById('caseTags');
const caseClose = caseModal.querySelector('.case-close');

const caseStudies = {
  skyl: {
    title: 'SKYL — Smart School Management App',
    desc: 'Designed a modern and user-friendly school management mobile app focused on improving student communication, classroom organization, and learning experience.',
    details: [
      'Skills & tools used: Figma, Canva, Adobe Photoshop, Adobe Illustrator, UI/UX Design, Wireframing, Prototyping, Mobile App Design, User Flow Design, Visual Design, Typography, User-Centered Design.',
      'Designed intuitive UI screens for attendance tracking, timetable management, homework updates, exam notifications, chat, eco rewards, and student performance reports.',
      'Applied responsive UI principles, clean layouts, and user-centered design techniques to create a polished mobile-first experience.'
    ],
    tags: ['Mobile App', 'Figma', 'Canva', 'Photoshop', 'Illustrator', 'UI/UX Design', 'Wireframing', 'Prototyping', 'User Flow', 'Visual Design']
  },
  boffi: {
    title: 'BOFFI — Korean Restaurant Website',
    desc: 'A premium Korean restaurant website with a dark-theme aesthetic inspired by Korean nightlife and street-food culture. Delivers a visually rich experience with bold typography, cinematic food photography, and immersive UI sections that create an authentic Korean dining vibe.',
    details: [
      '<strong>Design Goal:</strong> Create a stylish and engaging restaurant website that feels modern, energetic, and premium while highlighting Korean cuisine and culture.',
      '<strong>Key Features:</strong> Bold hero section with high-contrast Korean-inspired visuals, eye-catching food imagery, and modern CTA buttons. Interactive signature dish cards with premium presentation showcasing Korean BBQ, ramen, rice bowls, fried chicken, and desserts. Dark cinematic layout with glowing red highlights. Organized category-based menu system with smooth scrolling experience. Customer testimonials and trust-building content with premium visual hierarchy. Fully responsive design optimized for desktop, tablet, and mobile devices.',
      '<strong>Design Style:</strong> Dark Luxury Theme with Korean Street-Food Inspired UI, Red & Black Neon Color Palette, Cinematic Food Photography, and Minimal yet Bold Typography. The design combines warm ambient restaurant visuals with a blend of traditional and modern Korean aesthetic to create an immersive lifestyle-focused experience.',
      '<strong>Highlights:</strong> Premium Korean restaurant branding with modern dark-mode interface. Immersive visual storytelling with strong typography hierarchy and smooth user experience. Trend-focused restaurant web design that stands out in the industry.',
      'Built with Figma for interface design and Photoshop for cinematic food photography enhancement, ensuring a cohesive and professional final product.'
    ],
    tags: ['Website', 'Figma', 'Photoshop', 'Dark UI', 'Restaurant', 'Responsive', 'Premium Branding', 'Korean Design', 'Neon Aesthetic']
  },
  abstract: {
    title: 'Abstract Vision — Eye of Creativity',
    desc: 'A conceptual illustration project that blends organic shapes with expressive elements to represent creativity, imagination, and visual storytelling.',
    details: [
      'Developed a surreal composition with layered textures, flowing lines, and a bold color palette.',
      'Used illustration techniques to create a dramatic focal point centered on an expressive eye and botanical motifs.',
      'Designed the piece to communicate artistic energy and imaginative visual identity.'
    ],
    tags: ['Illustration', 'Creative Design', 'Visual Identity', 'Abstract Art']
  },
  dual: {
    title: 'Dual Perspective — Abstract Face Composition',
    desc: 'An expressive vector illustration exploring identity, emotion, and contrast through overlapping profile shapes and color dynamics.',
    details: [
      'Crafted a striking layout with contrasting facial forms and layered geometric accents.',
      'Emphasized bold color transitions, negative space, and abstract detail for visual tension.',
      'Created a modern illustration style that balances emotional narrative with graphic structure.'
    ],
    tags: ['Vector Art', 'Illustrator', 'Abstract', 'Composition']
  }
};


function openCaseStudy(key) {
  const caseData = caseStudies[key];
  if (!caseData) return;

  caseTitle.textContent = caseData.title;
  caseDesc.textContent = caseData.desc;
  caseDetails.innerHTML = caseData.details.map(item => `<p>${item}</p>`).join('');
  caseTags.innerHTML = caseData.tags.map(tag => `<span class="case-tag">${tag}</span>`).join('');

  caseModal.classList.add('open');
  caseModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  caseClose.focus();
}

function closeCaseStudy() {
  caseModal.classList.remove('open');
  caseModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

document.querySelectorAll('.case-btn').forEach(button => {
  button.addEventListener('click', () => openCaseStudy(button.dataset.case));
});


caseClose.addEventListener('click', closeCaseStudy);
caseModal.addEventListener('click', event => {
  if (event.target === caseModal) closeCaseStudy();
});

const techs = [
  { label: 'FIG', icon: 'FG', r: 100, color: '#a259ff' },
  { label: 'UX', icon: 'UX', r: 100, color: '#00d4ff' },
  { label: 'UI', icon: 'UI', r: 100, color: '#1a6fff' },
  { label: 'XD', icon: 'XD', r: 100, color: '#ff61f6' },
  { label: 'PS', icon: 'PS', r: 180, color: '#31a8ff' },
  { label: 'AI', icon: 'AI', r: 180, color: '#ff9a00' },
  { label: 'CAN', icon: 'CV', r: 180, color: '#00c4cc' },
  { label: 'CDR', icon: 'CD', r: 180, color: '#65d46e' },
  { label: 'BRD', icon: 'BD', r: 180, color: '#00ff9d' },
  { label: 'LAY', icon: 'LY', r: 180, color: '#2d87ff' },
];

const wrap = document.getElementById('orbitWrap');
const cx = 230;
const cy = 230;
const innerTechs = techs.filter(t => t.r === 100);
const outerTechs = techs.filter(t => t.r === 180);

techs.forEach(t => {
  const group = t.r === 100 ? innerTechs : outerTechs;
  const idx = group.indexOf(t);
  const total = group.length;
  const angle = (idx / total) * Math.PI * 2;

  const div = document.createElement('div');
  div.className = 'tech-dot';
  div.style.left = cx + t.r * Math.cos(angle) - 25 + 'px';
  div.style.top = cy + t.r * Math.sin(angle) - 25 + 'px';
  div.style.color = t.color;
  div.innerHTML = `<span class="ti">${t.icon}</span>${t.label}`;
  div.dataset.r = t.r;
  div.dataset.idx = idx;
  div.dataset.total = total;
  div.dataset.speed = t.r === 100 ? '.32' : '-.18';
  wrap.appendChild(div);
});

let orbitStart = null;
function animateOrbit(timestamp) {
  if (!orbitStart) orbitStart = timestamp;
  const elapsed = (timestamp - orbitStart) / 1000;

  wrap.querySelectorAll('.tech-dot').forEach(dot => {
    const r = Number(dot.dataset.r);
    const idx = Number(dot.dataset.idx);
    const total = Number(dot.dataset.total);
    const speed = Number(dot.dataset.speed);
    const angle = (idx / total) * Math.PI * 2 + elapsed * speed;

    dot.style.left = cx + r * Math.cos(angle) - 25 + 'px';
    dot.style.top = cy + r * Math.sin(angle) - 25 + 'px';
  });

  requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateOrbit);

// --- Project card tilt interaction ---
function setupProjectCardTilt() {
  const cards = document.querySelectorAll('.proj-card, .cert-card');
  cards.forEach(card => {
    const rect = () => card.getBoundingClientRect();
    function onMove(e) {
      const r = rect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rotateY = (px - 0.5) * 10; // -5 to 5 deg
      const rotateX = (0.5 - py) * 6; // -3 to 3 deg
      card.style.transform = `perspective(900px) translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    }
    function onEnter() {
      card.style.transition = 'transform .12s ease';
      card.addEventListener('mousemove', onMove);
    }
    function onLeave() {
      card.removeEventListener('mousemove', onMove);
      card.style.transition = 'transform .5s cubic-bezier(.2,.9,.2,1)';
      card.style.transform = '';
    }
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
  });
}

setupProjectCardTilt();
