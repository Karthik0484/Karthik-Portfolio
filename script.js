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