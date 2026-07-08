// Custom cursor disabled - using default browser cursor

// Remove legacy cursor hover references (ring was removed when custom cursor disabled)
// Add tilt interaction for project cards further below.

const hamburger = document.getElementById('navHamburger');
const drawer = document.getElementById('navDrawer');
const mobileQuery = window.matchMedia('(max-width: 640px)');

if (mobileQuery.matches && window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

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

document.querySelectorAll('.cert-output').forEach(card => {
  card.addEventListener('click', () => openProjectOutput(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectOutput(card);
    }
  });
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
  },
  macaw: {
    title: 'Scarlet Macaw — Wildlife Poster Design',
    desc: 'An editorial-style wildlife poster combining bold serif typography with vivid macaw photography to celebrate nature and biodiversity.',
    details: [
      'Designed a type-behind-image layout where large "PARROT" lettering sits behind the bird to add depth and visual interest.',
      'Used a clean white background and muted olive typography to keep focus on the photography and copy.',
      'Included short educational captions to give the poster an informative, editorial feel.'
    ],
    tags: ['Poster Design', 'Photoshop', 'Typography', 'Editorial Layout']
  },
  coffee: {
    title: 'Sometimes — Coffee Ad Creative',
    desc: 'A warm, mood-driven social media ad built around a heart-shaped steam illustration and a relatable one-line message.',
    details: [
      'Composed a cinematic brown-toned background to make the coffee cup and latte art the clear focal point.',
      'Added a playful heart-shaped steam effect and a UI-style context menu to give the ad a witty, tech-meets-lifestyle twist.',
      'Paired soft script and bold sans typography to deliver the message with warmth and clarity.'
    ],
    tags: ['Social Media Ad', 'Photoshop', 'Product Design', 'Typography']
  },
  shoesmain: {
    title: 'Step Into Comfort — Footwear Ad Design',
    desc: 'A product-focused e-commerce ad for the Shoesmain brand, highlighting comfort, durability, and everyday wearability.',
    details: [
      'Used a split-tone background to add visual contrast while keeping the white sneaker as the hero element.',
      'Designed simple line icons and labels to call out lightweight, durable, and everyday-ready features at a glance.',
      'Included a clear CTA button and brand logo placement optimized for e-commerce and social ad placements.'
    ],
    tags: ['E-commerce Ad', 'Photoshop', 'Product Photography', 'Icon Design']
  },
  streetwear: {
    title: 'Streetwear Redefined — Fashion Lookbook',
    desc: 'A fashion lookbook poster showcasing a checkered shirt outfit across multiple poses for a cohesive campaign feel.',
    details: [
      'Arranged multiple model poses side by side to show the outfit from different angles in one unified composition.',
      'Used a soft neutral background with a faded portrait accent to add depth without competing with the outfit.',
      'Paired an elegant serif headline with minimal supporting copy for a premium streetwear campaign look.'
    ],
    tags: ['Fashion Design', 'Photoshop', 'Lookbook', 'Typography']
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


const wrap = document.getElementById('orbitWrap');
const techs = [
  { icon: 'CV', label: 'Canva', color: '#40dfff', r: .45, angle: 225 },
  { icon: 'XD', label: 'Adobe XD', color: '#ff59d6', r: .34, angle: 270 },
  { icon: 'BD', label: 'Branding', color: '#a6ff7a', r: .47, angle: 350 },
  { icon: 'FG', label: 'Figma', color: '#ff6161', r: .34, angle: 22 },
  { icon: 'UX', label: 'UI/UX', color: '#ffd03d', r: .34, angle: 90 },
  { icon: 'PS', label: 'Photoshop', color: '#30c8ff', r: .45, angle: 125 },
  { icon: 'UI', label: 'UI Design', color: '#3bd4ff', r: .34, angle: 155 },
  { icon: 'AI', label: 'Illustrator', color: '#ffb020', r: .46, angle: 180 }
];

if (wrap) {
  techs.forEach((tech, idx) => {
    const dot = document.createElement('div');
    dot.className = 'tech-dot';
    dot.style.setProperty('--badge-color', tech.color);
    dot.dataset.idx = idx;
    dot.dataset.ratio = tech.r;
    dot.dataset.offset = tech.angle * Math.PI / 180;
    dot.innerHTML = `<span class="tech-icon">${tech.icon}</span><span class="tech-label">${tech.label}</span>`;
    wrap.appendChild(dot);
  });

  let orbitStart = null;
  const orbitSpeed = 0.30;
  function animateOrbit(timestamp) {
    if (!orbitStart) orbitStart = timestamp;
    const elapsed = (timestamp - orbitStart) / 1000;
    const size = wrap.offsetWidth;
    const cx = size / 2;
    const cy = size / 2;

    wrap.querySelectorAll('.tech-dot').forEach(dot => {
      const ratio = Number(dot.dataset.ratio);
      const offset = Number(dot.dataset.offset);
      const badgeSize = dot.offsetWidth;
      const angle = offset + elapsed * orbitSpeed;
      const r = size * ratio;

      dot.style.left = cx + r * Math.cos(angle) - badgeSize / 2 + 'px';
      dot.style.top = cy + r * Math.sin(angle) - badgeSize / 2 + 'px';
    });

    requestAnimationFrame(animateOrbit);
  }

  requestAnimationFrame(animateOrbit);
}

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
