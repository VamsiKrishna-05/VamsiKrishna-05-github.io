document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Fixed smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Get navbar height for proper offset
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    
                    // Calculate scroll position
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - navbarHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (hamburger) {
                            hamburger.classList.remove('active');
                        }
                    }
                }
            }
        });
    });

    // Typing effect for hero name
    function typeWriter() {
        const text = "Vamsi Krishna B";
        const typingElement = document.getElementById('typing-text');
        
        if (typingElement) {
            let i = 0;
            typingElement.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    typingElement.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    // After typing is complete, trigger hero stats animation
                    setTimeout(animateHeroStats, 500);
                }
            }
            
            // Start typing after initial animation
            setTimeout(type, 1500);
        } else {
            // If typing element doesn't exist, still trigger stats animation
            setTimeout(animateHeroStats, 2000);
        }
    }

    // Fixed hero stats animation
    function animateHeroStats() {
        const heroStats = document.querySelectorAll('.hero-stat .stat-number');
        const statsData = ['50000+', '15+', '25+'];
        
        heroStats.forEach((stat, index) => {
            if (statsData[index]) {
                const finalText = statsData[index];
                const numericValue = parseInt(finalText.replace(/\D/g, ''));
                const hasPlus = finalText.includes('+');
                
                let current = 0;
                const increment = Math.ceil(numericValue / 50);
                
                const updateStat = () => {
                    current += increment;
                    if (current < numericValue) {
                        stat.textContent = current + (hasPlus ? '+' : '');
                        setTimeout(updateStat, 40);
                    } else {
                        stat.textContent = finalText;
                    }
                };
                
                setTimeout(updateStat, index * 200);
            }
        });
    }

    // Initialize typing effect
    typeWriter();

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on section
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                
                if (entry.target.classList.contains('skills')) {
                    animateSkillTags();
                }
                
                if (entry.target.classList.contains('projects')) {
                    animateProjectCards();
                }
                
                if (entry.target.classList.contains('certifications')) {
                    animateCertCards();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Animated counters for about section
    function animateCounters() {
        const counters = document.querySelectorAll('.about .stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 40);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }

    // Animate skill tags with stagger effect
    function animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(0)';
                tag.style.opacity = '1';
            }, index * 100);
        });
    }

    // Animate project cards with stagger effect
    function animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card:not(.hidden)');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }

    // Animate certification cards
    function animateCertCards() {
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        card.classList.remove('hidden');
                        card.style.transform = 'translateY(0)';
                        card.style.opacity = '1';
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hidden');
                        card.style.transform = 'translateY(50px)';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            if (card.classList.contains('hidden')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });

    // Enhanced Project Details Toggle - Fixed Implementation
    window.toggleProjectDetails = function(button) {
        const projectCard = button.closest('.project-card');
        const projectDetails = projectCard.querySelector('.project-details');
        
        if (!projectDetails) {
            console.error('Project details not found');
            return;
        }
        
        const isExpanded = projectDetails.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            projectDetails.classList.remove('expanded');
            button.classList.remove('expanded');
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Show Details';
            
            // Animate collapse
            projectDetails.style.maxHeight = '0px';
            projectDetails.style.opacity = '0';
            projectDetails.style.marginTop = '0';
        } else {
            // Expand
            projectDetails.classList.add('expanded');
            button.classList.add('expanded');
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
            
            // Calculate the required height
            projectDetails.style.maxHeight = 'none';
            const height = projectDetails.scrollHeight;
            projectDetails.style.maxHeight = '0px';
            
            // Force reflow
            projectDetails.offsetHeight;
            
            // Animate expand
            projectDetails.style.maxHeight = height + 'px';
            projectDetails.style.opacity = '1';
            projectDetails.style.marginTop = '1.5rem';
            
            // Remove max-height after animation completes
            setTimeout(() => {
                if (projectDetails.classList.contains('expanded')) {
                    projectDetails.style.maxHeight = 'none';
                }
            }, 300);
        }
    };

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            
            // Reset form labels
            const labels = this.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-muted)';
            });
        });
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--bright-blue)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.top = '1rem';
                    label.style.left = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-muted)';
                }
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '-0.5rem';
                label.style.left = '0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--bright-blue)';
            }
        }
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced notification system with dark theme
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles for dark theme
        const bgColor = type === 'success' ? '#3b82f6' : '#ef4444';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.opacity = '1';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.opacity = '0.8';
            });
            
            closeBtn.addEventListener('click', () => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            });
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Enhanced parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
        
        // Update navbar background on scroll with enhanced dark theme
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(51, 65, 85, 0.8)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid #334155';
                navbar.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Enhanced hover effects for dark theme
    function addHoverEffects() {
        // Skill tags hover effect with enhanced dark theme
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });

        // Project cards enhanced hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
                this.style.borderColor = 'var(--bright-blue)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.borderColor = 'var(--border-primary)';
            });
        });

        // Certification cards hover effect with rotation
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.cert-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                    icon.style.transition = 'transform 0.6s ease';
                }
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.cert-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });

        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize enhanced hover effects
    addHoverEffects();

    // Enhanced active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // If we're at the top of the page, highlight home
        if (window.scrollY < 100) {
            currentSection = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active navigation on scroll with throttling
    let navTicking = false;
    function requestNavTick() {
        if (!navTicking) {
            requestAnimationFrame(updateActiveNavigation);
            navTicking = true;
            setTimeout(() => navTicking = false, 100);
        }
    }

    window.addEventListener('scroll', requestNavTick);

    // Initialize page
    updateActiveNavigation();

    // Enhanced project card interactions
    const projectButtons = document.querySelectorAll('.btn-expand, .btn-github');
    projectButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            if (this.classList.contains('btn-github')) {
                this.style.boxShadow = '0 5px 15px rgba(148, 163, 184, 0.3)';
            } else {
                this.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Handle profile image error fallback
    const profileImage = document.querySelector('.profile-photo');
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            // Replace with placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            placeholder.style.cssText = `
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--bright-blue), var(--light-blue));
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-primary);
                font-size: 4rem;
                border: 4px solid var(--bright-blue);
                box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3), 
                            0 0 0 8px rgba(59, 130, 246, 0.1);
                transition: all 0.3s ease;
            `;
            
            placeholder.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.4), 0 0 0 12px rgba(59, 130, 246, 0.15)';
            });
            
            placeholder.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 8px rgba(59, 130, 246, 0.1)';
            });
            
            this.parentNode.replaceChild(placeholder, this);
        });
    }

    // Add CSS for enhanced dark theme elements
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .nav-link.active {
            color: var(--text-primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Enhanced scrollbar for dark theme */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--bg-primary);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, var(--bright-blue), var(--light-blue));
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, var(--light-blue), var(--blue-300));
        }
        
        /* Enhanced selection colors */
        ::selection {
            background: rgba(59, 130, 246, 0.3);
            color: var(--text-primary);
        }
        
        ::-moz-selection {
            background: rgba(59, 130, 246, 0.3);
            color: var(--text-primary);
        }
        
        /* Smooth project details transition */
        .project-details {
            transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
            overflow: hidden;
        }
    `;
    document.head.appendChild(enhancedStyles);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
            
            // Close any expanded project details
            const expandedDetails = document.querySelectorAll('.project-details.expanded');
            expandedDetails.forEach(detail => {
                const expandButton = detail.parentNode.querySelector('.btn-expand');
                if (expandButton) {
                    toggleProjectDetails(expandButton);
                }
            });
        }
    });

    // Initialize smooth page entrance
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Ensure page starts at top
    window.scrollTo(0, 0);

    console.log('Enhanced portfolio loaded successfully with dark theme!');
});

// Add smooth scroll behavior for better UX
window.addEventListener('load', function() {
    // Ensure all content is loaded before final animations
    setTimeout(() => {
        if (document.body) {
            document.body.style.opacity = '1';
            document.body.style.visibility = 'visible';
        }
    }, 100);
});