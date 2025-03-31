document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');
        
        // Animate Links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Dynamic Text Animation
    const dynamicText = document.querySelector('.dynamic-text');
    const words = ["Web Geliştirici", "Programcı", "Tasarımcı", "FullStack Developer"];
    const highContrastColors = [
  "rgb(255, 0, 0)",       // Kırmızı
  "rgb(0, 255, 0)",       // Yeşil
  "rgb(0, 0, 255)",       // Mavi
  "rgb(255, 255, 0)",     // Sarı
  "rgb(255, 0, 255)",     // Pembe
  "rgb(0, 255, 255)",     // Cyan
  "rgb(128, 0, 128)",     // Mor
  "rgb(255, 165, 0)"      // Turuncu
];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 300;
    let colorChangeSpeed = 1; // Renk değişim hızı (ms)

    function getHighContrastColor() {
        return highContrastColors[Math.floor(Math.random() * highContrastColors.length)];
    }

    function applyContrastColor() {
        dynamicText.style.color = getHighContrastColor();
        dynamicText.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
    }

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            typeSpeed = 200;
            
            // Her harfte renk değiştirmek için:
            if (charIndex % 2 === 0) { // Her 2 harfte bir renk değişimi
                applyContrastColor();
            }
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typeSpeed = 100;
        } else {
            isDeleting = !isDeleting;
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
            typeSpeed = isDeleting ? 1500 : 500;
            
            // Yeni kelimeye geçerken mutlaka renk değiştir
            applyContrastColor();
        }
        
        setTimeout(typeEffect, typeSpeed);
    };

    // Renk değişimini başlat
    applyContrastColor();
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (diğer kodlar aynı)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            try {
                submitBtn.textContent = 'Gönderiliyor...';
                submitBtn.disabled = true;
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Mesajınız Başarıyla Gönderildi!</h3>
                        <p>En kısa sürede size dönüş yapacağım.</p>
                    </div>
                `;
            } catch (error) {
                submitBtn.textContent = 'Hata! Tekrar Deneyin';
                submitBtn.style.backgroundColor = '#f44336';
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
                console.error('Form submission error:', error);
            }
        });
    }

    // Scroll Animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .about-img, .about-text');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const animationPoint = windowHeight / 1.2;
            
            if (elementPosition < animationPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.skill-category, .project-card, .about-img, .about-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    typeEffect();
});