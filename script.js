// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or use system preference
const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply the theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getThemePreference());

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
let mobileMenuOpen = false;
let mobileMenu = null;

mobileMenuBtn.addEventListener('click', () => {
    if (!mobileMenuOpen) {
        // Create mobile menu if it doesn't exist
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <nav class="mobile-nav">
                    <ul class="mobile-nav-list">
                        <li><a href="#about" class="mobile-nav-link">Sobre mí</a></li>
                        <li><a href="#skills" class="mobile-nav-link">Habilidades</a></li>
                        <li><a href="#projects" class="mobile-nav-link">Proyectos</a></li>
                        <li><a href="#contact" class="mobile-nav-link">Contacto</a></li>
                    </ul>
                </nav>
            `;
            document.body.appendChild(mobileMenu);
            
            // Add click event to close menu when a link is clicked
            const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    mobileMenuOpen = false;
                    document.body.style.overflow = '';
                });
            });
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 4rem;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 4rem);
                    background-color: var(--background);
                    z-index: 99;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                }
                
                .mobile-menu.open {
                    transform: translateY(0);
                }
                
                .mobile-nav {
                    padding: 2rem;
                }
                
                .mobile-nav-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .mobile-nav-link {
                    font-size: 1.25rem;
                    font-weight: 500;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Open menu
        mobileMenu.classList.add('open');
        mobileMenuOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        // Close menu
        mobileMenu.classList.remove('open');
        mobileMenuOpen = false;
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .skill-card, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('fade-in');
        }
    });
};

// Add fade-in animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section, .skill-card, .project-card {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        animation: fadeIn 0.6s ease forwards;
    }
`;
document.head.appendChild(animationStyle);

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);