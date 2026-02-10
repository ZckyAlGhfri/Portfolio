/* =========================================
   ADVANCED JAVASCRIPT LOGIC
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Initialize EmailJS ---
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual public key from https://dashboard.emailjs.com/admin/account
    (function() {
        emailjs.init("6BNmPA4IFaw2UYK1e"); 
    })();


    // --- 1. Custom Cursor with Magnetic Effect ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Only enable on desktop
    if (window.matchMedia("(min-width: 769px)").matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            cursorOutline.style.left = `${cursorX}px`;
            cursorOutline.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // --- 2. Canvas Particle Network ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = '#a0a0a0';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(160, 160, 160,' + opacityValue * 0.05 + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            
            // Mouse interaction
            let mouseDistance = ((particlesArray[a].x - mouseX) * (particlesArray[a].x - mouseX))
                    + ((particlesArray[a].y - mouseY) * (particlesArray[a].y - mouseY));
            
            if (mouseDistance < 25000) {
                ctx.strokeStyle = 'rgba(0, 242, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
        }
    }

    function animateCanvas() {
        requestAnimationFrame(animateCanvas);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    initParticles();
    animateCanvas();


    // --- 3. Typewriter Effect ---
    const typeTextSpan = document.querySelector('.typewriter-text');
    const words = ["Software Engineer", "Creative Developer", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[textIndex];
        
        if (isDeleting) {
            typeTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    setTimeout(typeWriter, 1500);


    // --- 4. 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });


    // --- 5. Scroll Reveal ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // --- 6. Navbar Scroll Logic ---
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
            navbar.classList.add('hidden');
        } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle (Basic)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if(navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '5%';
            navLinks.style.background = '#050510';
            navLinks.style.padding = '1rem';
            navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
            navLinks.style.borderRadius = '8px';
        }
    });

    // --- 7. Contact Form Handling (EmailJS) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalBtnText = btn.innerHTML;

        // Set Loading State
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        // IMPORTANT: Replace these with your actual IDs from EmailJS
        const serviceID = 'service_op5i6vu';
        const templateID = 'template_s1topaa';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showSuccess();
            }, (err) => {
                showError(err);
            });

        function showSuccess() {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            formMessage.textContent = "Thank you! Your message has been sent successfully.";
            formMessage.className = "form-message success";
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                formMessage.textContent = "";
            }, 5000);
        }

        function showError(error) {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            formMessage.textContent = "Failed to send message. Please try again later.";
            formMessage.className = "form-message error";
            console.error('EmailJS Error:', error);
            
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            }, 3000);
        }
    });
});
