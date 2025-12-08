
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navUL = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navUL.classList.toggle('show');
        
        if (navUL.classList.contains('show')) {
            navLinks.forEach((link, index) => {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        } else {
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    const features = document.querySelectorAll('.feature');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    features.forEach(feature => {
        observer.observe(feature);
    });
    
    pricingCards.forEach(card => {
        observer.observe(card);
    });
    
    if (document.getElementById('stat1')) {
        animateStats();
    }
    
    if (document.querySelector('.service-tabs')) {
        setupServiceTabs();
    }
    
    if (document.getElementById('testimonial-slider')) {
        setupTestimonialSlider();
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (navUL.classList.contains('show')) {
                    hamburger.classList.remove('active');
                    navUL.classList.remove('show');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
});

function animateStats() {
    const statElements = [
        { element: document.getElementById('stat1'), target: 1250, duration: 2000 },
        { element: document.getElementById('stat2'), target: 12, duration: 2000 },
        { element: document.getElementById('stat3'), target: 10, duration: 2000 },
        { element: document.getElementById('stat4'), target: 28, duration: 2000 }
    ];
    
    const easeOutQuad = (t) => t * (2 - t);
    
    statElements.forEach(stat => {
        let startTimestamp = null;
        const startValue = 0;
        const duration = stat.duration;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const value = Math.floor(easedProgress * stat.target);
            stat.element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                stat.element.textContent = stat.target.toLocaleString();
            }
        };
        
        window.requestAnimationFrame(step);
    });
}

function setupServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.service-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
           
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
            });
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            
            setTimeout(() => {
                activeTab.classList.add('active');
                activeTab.style.opacity = '1';
            }, 10);
        });
    });
}

function setupTestimonialSlider() {
    const testimonials = [
        {
            name: "Marko Marković",
            role: "Član 3 godine",
            text: "Najbolja teretana u gradu! Profesionalni treneri i odlična atmosfera. Preporučujem svima!",
            image: "img/testimonial1.png"
        },
        {
            name: "Ana Anić",
            role: "Član 1 godinu",
            text: "Kroz godinu dana sam izgubila 15kg i osećam se fantastično. Hvala Fit & Strong timu!",
            image: "img/testimonial2.png"
        },
        {
            name: "Ivan Ivanović",
            role: "Član 5 godina",
            text: "Odlična oprema, čisto i uredno. Ne mogu zamisliti da idem negde drugde.",
            image: "img/testimonial3.png"
        }
    ];
    
    const slider = document.getElementById('testimonial-slider');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoSlideInterval;
    
    function renderTestimonial(index) {
        const testimonial = testimonials[index];
        slider.innerHTML = `
            <div class="testimonial">
                <div class="testimonial-img">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-content">
                    <p>"${testimonial.text}"</p>
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        `;
        
        resetAutoSlide();
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentIndex);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextTestimonial();
        }
        if (touchEndX > touchStartX + 50) {
            prevTestimonial();
        }
    }
    
    renderTestimonial(currentIndex);
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-nav prev';
    prevBtn.innerHTML = '&lt;';
    prevBtn.addEventListener('click', prevTestimonial);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-nav next';
    nextBtn.innerHTML = '&gt;';
    nextBtn.addEventListener('click', nextTestimonial);
    
    slider.parentElement.appendChild(prevBtn);
    slider.parentElement.appendChild(nextBtn);
}