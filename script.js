const mobileMenu = document.querySelector('#mobileMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu(){
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

function closeMenu(){
    mobileMenu.classList.remove('show');
    // Hide the menu after animation completes
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}

window.addEventListener('scroll', () =>{
    if(scrollY > 50){
        navBar.classList.add('bg-white','bg-opacity-50','backdrop-blur-lg','shadow-sm','dark:bg-darkTheme','dark:shadow-white/20');
        navLinks.classList.remove('bg-white','shadow-sm','bg-opacity-50','dark:border','dark:border-white/50','dark:bg-transparent');
    }else{
        navBar.classList.remove('bg-white','bg-opacity-50','backdrop-blur-lg','shadow-sm','dark:bg-darkTheme','dark:shadow-white/20');
        navLinks.classList.add('bg-white','shadow-sm','bg-opacity-50','dark:border','dark:border-white/50','dark:bg-transparent');
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

  function toggleTheme(){
    document.documentElement.classList.toggle('dark');

    if(document.documentElement.classList.contains('dark')){
        localStorage.theme = 'dark';
    }else{
        localStorage.theme = 'light';
    }
  }

// ---------------- section navigation (always show all sections) -----------
const sectionIds = ['home','about','skills','experience','projects','contact'];

function setSectionVisibility(targetId){
    const normalized = (!targetId || targetId === 'top') ? 'home' : targetId;
    // Ensure all sections are visible at all times
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if(el){ el.classList.remove('hidden'); }
    });

    if(normalized === 'home'){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const targetEl = document.getElementById(normalized);
    if(targetEl){
        const navHeight = navBar ? navBar.offsetHeight : 0;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    }
}

// Intercept nav link clicks (desktop and mobile)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    const hash = a.getAttribute('href');
    // Only handle our main nav targets
    if(['#top','#home','#about','#skills','#experience','#projects','#contact'].includes(hash)){
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = hash.replace('#','');
            setSectionVisibility(id);
            // Close mobile menu if open
            if(mobileMenu && mobileMenu.classList.contains('show')){
                closeMenu();
            }
            // Update URL hash without jumping
            history.replaceState(null, '', `#${id}`);
        });
    }
});

// Apply initial state based on URL hash
window.addEventListener('DOMContentLoaded', () => {
    const initial = (location.hash || '#home').replace('#','');
    // If any section accidentally retained 'hidden', unhide all
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if(el){ el.classList.remove('hidden'); }
    });
    setSectionVisibility(initial);
});

// Keep CSS --nav-height in sync with actual navbar height for accurate offsets
function updateNavHeightVar(){
  if(!navBar) return;
  const height = navBar.offsetHeight;
  document.documentElement.style.setProperty('--nav-height', `${height}px`);
}
window.addEventListener('load', updateNavHeightVar);
window.addEventListener('resize', updateNavHeightVar);

// ---------------- Dynamic Experience & Certifications rendering -----------
const experienceData = [
  {
    role: 'Python Full Stack with DevOps Intern',
    organization: 'PySpiders BTM',
    duration: 'Jun 2025 - Jul 2025',
    description: 'Completed a one-month internship focused on Python programming, full stack development, and DevOps tools. Actively participated in hands-on training, project work, and team collaboration, demonstrating dedication, punctuality, and a strong learning attitude.',
    skills: ['Python', 'Full Stack Development', 'DevOps', 'HTML', 'CSS', 'JavaScript'],
    // Optional documents; add valid URLs to show buttons
    offerLetterUrl: './images/QSpiders offer_letter.pdf',
    completionCertificateUrl: './images/Internship certificate PySpider.pdf'
  },
  {
  role: 'Front End Web Development Intern',
  organization: 'Edunet Foundation (AICTE – SkillsBuild Program)',
  duration: 'Aug 2025 - Oct 2025',
  description: 'Selected for a 6-week internship under the Edunet Foundation and AICTE SkillsBuild Program. Worked independently on a front-end web development project under mentorship guidance. Gained hands-on experience through masterclasses, project-based learning, and real-world problem solving using the SkillsBuild e-learning platform.',
  skills: ['HTML', 'CSS', 'JavaScript', 'Frontend Development', 'Project Management'],
   offerLetterUrl: './images/AICTE(Front-End) offer_letter.pdf',
   completionCertificateUrl: './images/AICTE FWD1.pdf'
},
  {
  role: 'AI & Cloud Technology Intern',
  organization: 'Edunet Foundation (AICTE – SkillsBuild Program)',
  duration: 'Sept 2025 - Oct 2025',
  description: 'Completed a 4-week internship focused on Artificial Intelligence and Cloud Technology. Worked on project-based learning with mentor guidance, exploring real-world applications through the IBM SkillsBuild platform.',
  skills: ['Artificial Intelligence', 'Cloud Computing', 'Machine Learning', 'Python'],
  offerLetterUrl: './images/AICTE B4 Offer Letter(AI).pdf',
  completionCertificateUrl: './images/AICTE AI1.pdf'
}

 
];

const certificationsData = [
  {
    title: 'The Complete Full‑Stack Web Development Bootcamp',
    issuedBy: 'Udemy',
    date: 'Sept 2025',
    link: './images/Udemy-Certificate.pdf'
  },
  {
    title: 'Deloitte Australia – Technology Job Simulation (Forage)',
    issuedBy: 'Deloitte (via Forage)',
    date: 'Jun 2025',
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_yKm7q2toDrfk3t4AF_1749913569450_completion_certificate.pdf'
  },
  {
  title: 'TCS iON Career Edge - Young Professional',
  issuedBy: 'TCS iON',
  date: ' Jul 2025',
  link: './images/Karthik_K TCS_ion.pdf'
}
,
  {
  title: '30 Days MasterClass in Full Stack Development',
  issuedBy: 'NoviTech R&D Private Limited',
  date: 'Oct 2024',
  link: './images/Novi-Tech.pdf'
},

];

let showAllCerts = false;
let showAllExperience = false;

// Function to apply fade animation to elements
function applyFadeAnimation(element, show) {
  if (show) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s ease-in-out';
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  } else {
    element.style.opacity = '1';
    element.style.transition = 'opacity 0.3s ease-in-out';
    setTimeout(() => {
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.opacity = '1';
      }, 300);
    }, 10);
  }
}

function renderExperience(){
  const container = document.getElementById('experienceList');
  if(!container) return;
  // latest first (already in order, but ensure)
  const items = [...experienceData];
  const visible = showAllExperience ? items : items.slice(0, 2); // Show only first 2 items initially
  
  // Apply fade animation
  applyFadeAnimation(container, showAllExperience);
  
  container.innerHTML = visible.map(exp => {
    const skills = exp.skills && exp.skills.length ? `<div class=\"mt-2 flex flex-wrap gap-2\">${exp.skills.map(s=>`<span class=\"px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300\">${s}</span>`).join('')}</div>` : '';
    
    // Create the new buttons only if URLs are provided
    const offerButton = exp.offerLetterUrl ? 
      `<a href=\"${exp.offerLetterUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"px-4 py-1.5 rounded-full border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-center\">View Offer Letter</a>` : '';
    
    const completionButton = exp.completionCertificateUrl ? 
      `<a href=\"${exp.completionCertificateUrl}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"px-4 py-1.5 rounded-full border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-center\">View Completion Certificate</a>` : '';
    
    // Only show the buttons container if at least one button exists
    const buttonsContainer = (exp.offerLetterUrl || exp.completionCertificateUrl) ? 
      `<div class=\"mt-3 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0\">${offerButton}${completionButton ? (offerButton ? ' ' : '') + completionButton : ''}</div>` : '';
    
    return `
      <div class=\"p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all\">
        <div class=\"flex items-center justify-between\">
          <h4 class=\"text-lg font-semibold\">${exp.role}</h4>
          <span class=\"text-sm text-gray-500\">${exp.duration}</span>
        </div>
        <p class=\"text-sm text-gray-600 dark:text-gray-300\">${exp.organization}</p>
        <p class=\"mt-2 text-gray-700 dark:text-gray-300\">${exp.description}</p>
        ${skills}
        ${buttonsContainer}
      </div>
    `;
  }).join('');
}

function renderCertifications(){
  const container = document.getElementById('certList');
  if(!container) return;
  // latest first by date string descending (simple)
  const items = [...certificationsData];
  const visible = showAllCerts ? items : items.slice(0,4); // Show 4 items by default instead of 3
  
  // Apply fade animation
  applyFadeAnimation(container);
  
  container.innerHTML = visible.map(cert => `
    <div class=\"p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all\">
      <div class=\"flex items-center justify-between\">
        <h4 class=\"text-lg font-semibold\">${cert.title}</h4>
        <span class=\"text-sm text-gray-500\">${cert.date}</span>
      </div>
      <p class=\"text-sm text-gray-600 dark:text-gray-300\">${cert.issuedBy}</p>
      ${cert.link ? `<a href=\"${cert.link}\" target=\"_blank\" class=\"mt-3 inline-block px-4 py-1.5 rounded-full border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors\">View Certificate</a>` : ''}
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderCertifications();
  
  // Handle unified button for both sections
  const toggleAllBtn = document.getElementById('toggleAllBtn');
  if(toggleAllBtn){
    toggleAllBtn.addEventListener('click', () => {
      // Toggle both sections
      showAllExperience = !showAllExperience;
      showAllCerts = !showAllCerts;
      
      // Re-render both sections
      renderExperience();
      renderCertifications();
      
      // Update button text
      const allShown = showAllExperience && showAllCerts;
      toggleAllBtn.textContent = allShown ? 'View Less' : 'View More';
    });
  }
});

// ---------------- PDF Preview helpers ----------------
function openPdfPreview(pdfUrl){
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if(!modal || !frame) return;
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

function closePdfPreview(){
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  if(!modal || !frame) return;
  frame.src = '';
  modal.classList.add('hidden');
  // Restore background scroll when modal closes
  document.body.classList.remove('overflow-hidden');
}

// Enhance certificate links: if link ends with .pdf, open modal preview
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if(!anchor) return;
  const href = anchor.getAttribute('href') || '';
  if(href.toLowerCase().endsWith('.pdf')){
    e.preventDefault();
    openPdfPreview(href);
  }
});
