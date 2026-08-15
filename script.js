// Force scroll to top on reload
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}
window.onload = function () {
  window.scrollTo(0, 0);
};

const mobileMenu = document.querySelector('#mobileMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu() {
  if (mobileMenu.classList.contains('show')) {
    closeMenu();
  } else {
    mobileMenu.classList.remove('hidden');
    // Trigger animation after removing hidden class
    setTimeout(() => {
      mobileMenu.classList.add('show');
    }, 10);
  }
}

function closeMenu() {
  mobileMenu.classList.remove('show');
  // Hide the menu after animation completes
  setTimeout(() => {
    mobileMenu.classList.add('hidden');
  }, 300);
}

window.addEventListener('scroll', () => {
  if (scrollY > 50) {
    navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
    navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
  } else {
    navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
    navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
  }
})

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  const menuButton = document.querySelector('[onclick="openMenu()"]');
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnMenuButton = menuButton && menuButton.contains(event.target);

  if (!isClickInsideMenu && !isClickOnMenuButton && mobileMenu.classList.contains('show')) {
    closeMenu();
  }
});

// ---------------- light mode and dark mode ----------->

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

function toggleTheme() {
  document.documentElement.classList.toggle('dark');

  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }
}

// ---------------- section navigation (always show all sections) -----------
const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

function setSectionVisibility(targetId) {
  const normalized = (!targetId || targetId === 'top') ? 'home' : targetId;

  if (normalized === 'home') {
    // HOME MODE: Show ALL sections
    document.body.classList.add('home-active');
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });
    // Scroll to very top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // FOCUS MODE: Show ONLY the target section
    document.body.classList.remove('home-active');
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === normalized) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });
    // Scroll to top immediately to show the focused section correctly
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // Update nav links to show which one is focused
  updateActiveNavLink(normalized);
}

function updateActiveNavLink(activeId) {
  // Normalize IDs: both 'home' and 'top' refer to the Home link
  const desktopNavLinks = document.querySelectorAll('nav ul a');
  const mobileNavLinks = document.querySelectorAll('#mobileMenu a');

  const allLinks = [...desktopNavLinks, ...mobileNavLinks];

  allLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    const isHome = (href === 'home' || href === 'top');
    const isActiveHome = (activeId === 'home' || activeId === 'top') && isHome;
    const isActiveSection = (href === activeId);

    if (isActiveHome || isActiveSection) {
      link.classList.add('nav-link-active');
    } else {
      link.classList.remove('nav-link-active');
    }
  });
}

// Intercept nav link clicks (desktop and mobile)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  const hash = a.getAttribute('href');
  // Only handle our main nav targets
  if (['#top', '#home', '#about', '#skills', '#experience', '#projects', '#contact'].includes(hash)) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = hash.replace('#', '');
      setSectionVisibility(id);
      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        closeMenu();
      }
      // Update URL hash without jumping
      history.replaceState(null, '', `#${id}`);
    });
  }
});

// Apply initial state based on URL hash
window.addEventListener('DOMContentLoaded', () => {
  const initial = (location.hash || '#home').replace('#', '');
  // If any section accidentally retained 'hidden', unhide all
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('hidden'); }
  });
  setSectionVisibility(initial);
});

// Keep CSS --nav-height in sync with actual navbar height for accurate offsets
function updateNavHeightVar() {
  if (!navBar) return;
  const height = navBar.offsetHeight;
  document.documentElement.style.setProperty('--nav-height', `${height}px`);
}
window.addEventListener('load', updateNavHeightVar);
window.addEventListener('resize', updateNavHeightVar);

// // ---------------- Dynamic Experience, Certifications & Training Rendering -----------
const experienceData = [
  {
    role: 'Software Engineering Intern',
    company: 'Wyzmindz Solutions Pvt. Ltd.',
    duration: 'May 2026 – Present',
    description: 'Working on Python-based data engineering and automation workflows including ETL orchestration, FTP monitoring, Talend/Python job triggering, and Windows Service deployment with NSSM. Contributing to data migration, validation, and AI-based speech processing workflows.',
    skills: ['Python', 'ETL', 'MSSQL', 'MySQL', 'MongoDB', 'ClickHouse', 'Talend', 'NSSM'],
    isCurrent: true
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Sourcesys Technologies',
    duration: 'Feb 2026 – Apr 2026',
    description: 'Developed web interfaces and backend services using React.js, Node.js, Express.js, and MongoDB, with experience in REST APIs, authentication, API integration, debugging, and testing.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    isCurrent: false
  }
];

const certificationsData = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuedBy: 'IBM SkillsBuild',
    date: 'Oct 2025',
    link: './images/Completion Certificate _ SkillsBuild(AI).pdf'
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuedBy: 'Udemy',
    date: 'Sept 2025',
    link: './images/Udemy-Certificate.pdf'
  },
  {
    title: 'Deloitte Australia Technology Job Simulation',
    issuedBy: 'Forage',
    date: 'Jun 2025',
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_yKm7q2toDrfk3t4AF_1749913569450_completion_certificate.pdf'
  },
  {
    title: 'TCS iON Career Edge – Young Professional',
    issuedBy: 'TCS iON',
    date: 'Jul 2025',
    link: './images/Karthik_K TCS_ion.pdf'
  }
];

const trainingData = [
  {
    title: 'AI & Cloud Technology',
    provider: 'Edunet Foundation',
    duration: 'Sep 2025 – Oct 2025',
    link: './images/AICTE AI1.pdf'
  },
  {
    title: 'Front-End Web Development',
    provider: 'Edunet Foundation',
    duration: 'Aug 2025 – Oct 2025',
    link: './images/AICTE FWD1.pdf'
  }
];

function renderExperience() {
  const container = document.getElementById('experienceList');
  if (!container) return;

  container.innerHTML = experienceData.map(exp => {
    const skillsHtml = exp.skills && exp.skills.length
      ? `<div class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">${exp.skills.map(s => `<span class="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40">${s}</span>`).join('')}</div>`
      : '';

    const highlightBorder = exp.isCurrent
      ? 'border border-purple-300/90 dark:border-purple-800/80 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm'
      : 'border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 shadow-sm';

    return `
      <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800 ${highlightBorder} hover:shadow-md transition-all duration-300 w-full min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
          <h4 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">${exp.role}</h4>
          <span class="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-0.5 rounded-full w-fit shrink-0">${exp.duration}</span>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">${exp.company}</p>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">${exp.description}</p>
        ${skillsHtml}
      </div>
    `;
  }).join('');
}

function renderCertifications() {
  const certContainer = document.getElementById('certList');
  if (certContainer) {
    certContainer.innerHTML = certificationsData.map(cert => `
      <div class="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/70 hover:border-purple-200 dark:hover:border-purple-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 w-full min-w-0">
        <div class="min-w-0 flex-1">
          <h4 class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white leading-snug">${cert.title}</h4>
          <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">${cert.issuedBy} • <span class="font-medium">${cert.date}</span></p>
        </div>
        ${cert.link ? `
          <a href="${cert.link}" target="_blank" rel="noopener noreferrer"
            class="shrink-0 px-3 py-1 text-xs font-medium rounded-full border border-purple-500/70 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all inline-flex items-center gap-1.5 self-start sm:self-auto">
            <i class="fas fa-file-pdf text-[10px]"></i>
            <span>View Certificate</span>
          </a>
        ` : ''}
      </div>
    `).join('');
  }

  const trainingContainer = document.getElementById('trainingList');
  if (trainingContainer) {
    trainingContainer.innerHTML = trainingData.map(item => `
      <div class="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/70 hover:border-purple-200 dark:hover:border-purple-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 w-full min-w-0">
        <div class="min-w-0 flex-1">
          <h4 class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white leading-snug">${item.title}</h4>
          <p class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">${item.provider} • <span class="font-medium">${item.duration}</span></p>
        </div>
        ${item.link ? `
          <a href="${item.link}" target="_blank" rel="noopener noreferrer"
            class="shrink-0 px-3 py-1 text-xs font-medium rounded-full border border-purple-500/70 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all inline-flex items-center gap-1.5 self-start sm:self-auto">
            <i class="fas fa-file-pdf text-[10px]"></i>
            <span>View Certificate</span>
          </a>
        ` : ''}
      </div>
    `).join('');
  }
}

// ---------------- Contact Form AJAX Submission ----------------
async function handleContactSubmit(e) {
  if (e) e.preventDefault();
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  if (!contactForm || !formSuccessMessage) return false;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-block animate-spin mr-1"><i class="fas fa-circle-notch text-xs"></i></span>
      <span>Sending...</span>
    `;
  }

  try {
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    const result = await response.json();
    if (response.status === 200 || result.success) {
      contactForm.reset();
      contactForm.classList.add('hidden');
      formSuccessMessage.classList.remove('hidden');
    } else {
      alert(result.message || 'Something went wrong. Please try again or email directly.');
    }
  } catch (err) {
    alert('Network error. Please check your connection or email directly.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
  return false;
}

function resetContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  if (formSuccessMessage) formSuccessMessage.classList.add('hidden');
  if (contactForm) contactForm.classList.remove('hidden');
}

window.handleContactSubmit = handleContactSubmit;
window.resetContactForm = resetContactForm;

document.addEventListener('DOMContentLoaded', () => {
  setSectionVisibility('home');
  renderExperience();
  renderCertifications();

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  const resetFormBtn = document.getElementById('resetFormBtn');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', resetContactForm);
  }
});

// ---------------- PDF Preview helpers ----------------
function openPdfPreview(pdfUrl) {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if (!modal || !frame) return;
  // Default zoom: 75% for external links, FORCE 25% for local PDFs in folder
  let zoomedUrl = pdfUrl || '';
  try {
    const parsed = new URL(pdfUrl, location.href);
    const isSameOrigin = parsed.origin === location.origin;
    const isPdf = parsed.pathname.toLowerCase().endsWith('.pdf');
    if (isSameOrigin && isPdf) {
      // Rebuild without a trailing '?' and force clean hash for zoom
      const search = parsed.search ? parsed.search : '';
      const fileName = parsed.pathname.split('/').pop() || '';
      const isUdemy = fileName.toLowerCase() === 'udemy-certificate.pdf';
      // For Udemy certificate, set only zoom to 27% (no page directive)
      zoomedUrl = isUdemy
        ? `${parsed.origin}${parsed.pathname}${search}#zoom=40`
        : `${parsed.origin}${parsed.pathname}${search}#page=1&zoom=40`;
    } else {
      const hasHash = (pdfUrl || '').includes('#');
      zoomedUrl = hasHash ? `${pdfUrl}&zoom=75` : `${pdfUrl}#zoom=75`;
    }
  } catch (_) {
    // Treat relative (non-http) URLs as local PDFs
    if (!/^https?:/i.test(pdfUrl)) {
      const base = pdfUrl.split('#')[0];
      const fileName = base.split('/').pop() || '';
      const isUdemy = fileName.toLowerCase() === 'udemy-certificate.pdf';
      zoomedUrl = isUdemy ? `${base}#zoom=27` : `${base}#page=1&zoom=25`;
    } else {
      const hasHash = (pdfUrl || '').includes('#');
      zoomedUrl = hasHash ? `${pdfUrl}&zoom=75` : `${pdfUrl}#zoom=75`;
    }
  }
  frame.src = zoomedUrl;
  modal.classList.remove('hidden');
  // Lock background scroll while modal is open
  document.body.classList.add('overflow-hidden');
}

function closePdfPreview() {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if (!modal || !frame) return;
  frame.src = '';
  modal.classList.add('hidden');
  // Restore background scroll when modal closes
  document.body.classList.remove('overflow-hidden');
}

// Enhance certificate links: if link ends with .pdf, open modal preview
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href') || '';
  if (href.toLowerCase().endsWith('.pdf')) {
    e.preventDefault();
    openPdfPreview(href);
  }
});

// ---------------- Projects View More/Less Logic ----------------
document.addEventListener('DOMContentLoaded', () => {
  const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
  const projectCards = document.querySelectorAll('.project-card');

  if (viewMoreBtn && projectCards.length > 6) {
    viewMoreBtn.addEventListener('click', () => {
      const isExpanded = viewMoreBtn.textContent.trim() === 'View Less';
      const hiddenProjects = Array.from(projectCards).slice(6);

      if (!isExpanded) {
        // Expand: Show additional projects
        hiddenProjects.forEach((card, index) => {
          card.classList.remove('hidden');
          // Start slightly smaller and transparent
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          // Animate to full size and opacity
          const anim = card.animate([
            { opacity: 0, transform: 'scale(0.95)' },
            { opacity: 1, transform: 'scale(1)' }
          ], {
            duration: 500,
            easing: 'ease-out',
            fill: 'forwards',
            delay: index * 100 // Staggered delay
          });

          anim.onfinish = () => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          };
        });
        viewMoreBtn.textContent = 'View Less';
      } else {
        // Collapse: Hide additional projects
        hiddenProjects.reverse().forEach((card, index) => {
          const anim = card.animate([
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.95)' }
          ], {
            duration: 400,
            easing: 'ease-in',
            fill: 'forwards',
            delay: index * 50 // Faster staggered delay for closing
          });

          anim.onfinish = () => {
            card.classList.add('hidden');
            card.style.opacity = '';
            card.style.transform = '';
          };
        });
        viewMoreBtn.textContent = 'View More';

        // Scroll back to the top of the projects section so the user isn't left at the bottom
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          setTimeout(() => {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100); // Slight delay to let animations start
        }
      }
    });
  }
});
