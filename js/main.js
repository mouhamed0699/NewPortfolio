// Portfolio JavaScript - Fichier principal
document.addEventListener('DOMContentLoaded', function() {
    // Charger les composants d'abord
    loadComponents().then(() => {
        // Initialiser les composants après le chargement
        initLoader();
        initNavigation();
        initMobileMenu();
        initScrollEffects();
        initAnimations();
    });
});

// ==========================================================================
// CHARGEMENT DES COMPOSANTS
// ==========================================================================
async function loadComponents() {
    try {
        // Charger le header
        const headerResponse = await fetch('components/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header').innerHTML = headerHTML;
        
        // Charger le footer
        const footerResponse = await fetch('components/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerHTML;
        
        console.log('Composants chargés avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des composants:', error);
        // Fallback si les composants ne se chargent pas
        document.getElementById('header').innerHTML = `
            <header class="header">
                <div class="container header-container">
                    <a href="index.html" class="logo">
                        <span class="logo-icon">M</span>
                        <span>Pro<span class="logo-accent">Niah</span></span>
                    </a>
                    <button class="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </button>
                    <nav class="nav">
                        <a href="index.html" class="nav-link">Accueil</a>
                        <a href="about.html" class="nav-link">À propos</a>
                        <a href="projects.html" class="nav-link">Projets</a>
                        <a href="experiences.html" class="nav-link">Experiences</a>
                        <a href="blog.html" class="nav-link">Notes</a>
                        <a href="contact.html" class="nav-link">Contact</a>
                    </nav>
                </div>
            </header>
        `;
        
        document.getElementById('footer').innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <div class="footer-logo">Pro<span>Niah</span></div>
                            <p class="footer-tagline">Spécialiste BI & Analytics / Data Scientist orienté décisionnel</p>
                            <div class="social-links">
                                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-medium"></i></a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="footer-title">Navigation</h4>
                            <ul class="footer-links">
                                <li><a href="index.html">Accueil</a></li>
                                <li><a href="about.html">À propos</a></li>
                                <li><a href="projects.html">Projets</a></li>
                                <li><a href="blog.html">Notes & Opinions</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="footer-title">Expertises</h4>
                            <ul class="footer-links">
                                <li><a href="projects/finance.html">Analyse Financière</a></li>
                                <li><a href="projects/fraude.html">Détection de Fraude</a></li>
                                <li><a href="projects/data-science.html">Data Science</a></li>
                                <li><a href="projects/data-analyst.html">Data Analyse</a></li>
                                <li><a href="projects/projects-marketing.html">Marketing Analytics</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="footer-title">Contact</h4>
                            <ul class="footer-links">
                                <li><i class="fas fa-envelope"></i> niahmouhammed99@gmail.com</li>
                                <li><i class="fas fa-phone"></i> +221 76 579 33 13(message)</li>
                                <li><i class="fas fa-map-marker-alt"></i> Dakar, Sénégal</li>
                                <li><i class="fas fa-language"></i> FR/EN/WOLOF</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2024 Portfolio DataPro. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// ==========================================================================
// LOADER
// ==========================================================================
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        // Masquer le loader après le chargement complet
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

// ==========================================================================
// NAVIGATION
// ==========================================================================
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!header) return;
    
    // Effet de scroll sur le header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Mettre en surbrillance le lien actif
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            // Enlever "active" de tous les liens
            link.classList.remove('active');
            
            // Ajouter "active" au lien correspondant
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
            
            // Pour les pages avec hash (comme contact)
            if (linkPage.startsWith('#') && window.location.hash === linkPage) {
                link.classList.add('active');
            }
        });
    }, 100);
}

// ==========================================================================
// MENU MOBILE
// ==========================================================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (!mobileToggle || !nav) return;
    
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        mobileToggle.classList.toggle('active');
        
        // Animation de l'icône
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('nav-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fermer le menu en cliquant sur un lien
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            mobileToggle.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !mobileToggle.contains(event.target)) {
            nav.classList.remove('nav-open');
            mobileToggle.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ==========================================================================
// EFFETS DE SCROLL
// ==========================================================================
function initScrollEffects() {
    // Smooth scroll pour les ancres internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Fermer le menu mobile si ouvert
                const mobileToggle = document.querySelector('.mobile-menu-btn');
                const nav = document.querySelector('.nav');
                if (nav && nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                        const icon = mobileToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Scroll vers l'élément
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans recharger la page
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Animation au scroll avec Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target); // Arrêter d'observer après l'animation
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    setTimeout(() => {
        document.querySelectorAll('.expertise-card, .project-card, .blog-post, .skill-item, .experience-card').forEach(el => {
            el.classList.add('observe-me');
            observer.observe(el);
        });
    }, 500);
}

// ==========================================================================
// ANIMATIONS
// ==========================================================================
function initAnimations() {
    // Animation des statistiques au scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }
    
    // Fonction d'animation de compteur
    function animateCounter(element) {
        const text = element.textContent;
        let target;
        
        // Extraire le nombre
        if (text.includes('%')) {
            target = parseInt(text.replace('%', ''));
        } else if (text.includes('+')) {
            target = parseInt(text.replace('+', ''));
        } else {
            target = parseInt(text);
        }
        
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = 20;
        const increment = target / (duration / step);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = text.includes('%') ? target + '%' : 
                                    text.includes('+') ? target + '+' : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, step);
    }
    
    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width') || '100%';
                    entry.target.style.width = width;
                    entry.target.classList.add('animated');
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillsObserver.observe(bar));
    }
}

// ==========================================================================
// NOTIFICATIONS
// ==========================================================================
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               type === 'warning' ? 'exclamation-triangle' : 
                               'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style pour la notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: var(--radius-lg);
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--primary);
            max-width: 400px;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success { border-left-color: var(--success); }
        .notification-error { border-left-color: var(--error); }
        .notification-warning { border-left-color: var(--warning); }
        .notification-info { border-left-color: var(--info); }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        .notification-content i {
            font-size: 1.25rem;
        }
        .notification-success .notification-content i { color: var(--success); }
        .notification-error .notification-content i { color: var(--error); }
        .notification-warning .notification-content i { color: var(--warning); }
        .notification-info .notification-content i { color: var(--info); }
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
            transition: all var(--transition-fast);
        }
        .notification-close:hover {
            color: var(--text-primary);
            background: var(--bg-light);
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                style.remove();
            }
        }, 300);
    });
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// ==========================================================================
// FONCTIONS GLOBALES
// ==========================================================================
window.Portfolio = {
    showNotification,
    initLoader,
    initNavigation,
    initMobileMenu,
    initScrollEffects,
    initAnimations
};

// Initialiser automatiquement quand la page est prête
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadComponents().then(() => {
            initLoader();
            initNavigation();
            initMobileMenu();
            initScrollEffects();
            initAnimations();
        });
    });
} else {
    loadComponents().then(() => {
        initLoader();
        initNavigation();
        initMobileMenu();
        initScrollEffects();
        initAnimations();
    });
}