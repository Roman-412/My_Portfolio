// ==========================================
// Ranjith Kumar - Full Stack Developer Portfolio
// Interactive Client Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typed.js Role Animation
    if (typeof Typed !== 'undefined' && document.querySelector('.text')) {
        new Typed('.text', {
            strings: [
                'Full Stack Developer',
                'Python & FastAPI Engineer',
                'Frontend & React Specialist',
                'PostgreSQL & API Builder',
                'UI/UX Enthusiast'
            ],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        });
    }

    // 2. Mobile Menu Drawer Toggle & Outside-Click Handling
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navbar.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'bx bx-x';
                document.body.style.overflowY = 'hidden'; // Prevent background scrolling when menu open
            } else {
                icon.className = 'bx bx-menu';
                document.body.style.overflowY = 'auto';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                document.body.style.overflowY = 'auto';
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'bx bx-menu';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar.classList.contains('active') && !navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                document.body.style.overflowY = 'auto';
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'bx bx-menu';
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.body.style.overflowY = 'auto';
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'bx bx-menu';
            }
        });
    }

    // 3. Scroll Header & Back To Top Button
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky header class
        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTop) {
            if (scrollY > 350) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // ScrollSpy Active Link Update
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 4. Scroll Reveal Animations with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 5. Skill Bar Fill Animation with IntersectionObserver
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if ('IntersectionObserver' in window && skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    if (progress) {
                        bar.style.width = progress;
                    }
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.15
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    } else {
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress') || '50%';
        });
    }

    // 6. Contact Form Interactive Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending Message...";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "<i class='bx bx-check'></i> Message Sent!";
                formStatus.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
});
