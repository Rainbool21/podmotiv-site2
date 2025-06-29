// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Interactive Mouse Effects
class InteractiveEffects {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.particles = [];
        this.cursorTrail = [];
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        this.createCursorTrail();
        this.createMagneticElements();
        this.createParticleSystem();
        this.createMouseTracker();
        this.create3DEffects();
    }

    createMouseTracker() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Update cursor trail
            this.cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (this.cursorTrail.length > 20) {
                this.cursorTrail.shift();
            }
            
            // Update magnetic elements
            this.updateMagneticElements();
            
            // Create particles on click
            if (e.buttons === 1) {
                this.createClickParticles(e.clientX, e.clientY);
            }
        });

        // Create particles on click
        document.addEventListener('click', (e) => {
            this.createClickParticles(e.clientX, e.clientY);
        });
    }

    createCursorTrail() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
        `;
        document.body.appendChild(trail);

        setInterval(() => {
            if (this.cursorTrail.length > 0) {
                trail.innerHTML = this.cursorTrail.map((point, index) => {
                    const opacity = (index / this.cursorTrail.length) * 0.3;
                    const size = (index / this.cursorTrail.length) * 8 + 2;
                    return `
                        <div style="
                            position: absolute;
                            left: ${point.x}px;
                            top: ${point.y}px;
                            width: ${size}px;
                            height: ${size}px;
                            background: radial-gradient(circle, rgba(0,255,136,${opacity}) 0%, transparent 70%);
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            pointer-events: none;
                        "></div>
                    `;
                }).join('');
            }
        }, 16);
    }

    createMagneticElements() {
        const magneticElements = document.querySelectorAll('.btn, .nav-link, .floating-icon, .skill-card, .stat-item');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
                element.style.transition = 'transform 0.3s ease';
            });
        });
    }

    updateMagneticElements() {
        const magneticElements = document.querySelectorAll('.btn, .nav-link, .floating-icon, .skill-card, .stat-item');
        
        magneticElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = this.mouse.x - centerX;
            const distanceY = this.mouse.y - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < 200) {
                const strength = (200 - distance) / 200;
                const moveX = distanceX * strength * 0.1;
                const moveY = distanceY * strength * 0.1;
                const scale = 1 + strength * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
            }
        });
    }

    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(particleContainer);

        // Create background particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer, true);
        }
    }

    createParticle(container, isBackground = false) {
        const particle = document.createElement('div');
        const colors = ['#00ff88', '#00d4ff', '#ffd700', '#ff3366', '#8a2be2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            pointer-events: none;
            animation: ${isBackground ? 'float-particle' : 'click-particle'} ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        container.appendChild(particle);
        
        if (!isBackground) {
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    createClickParticles(x, y) {
        const container = document.querySelector('.particle-container');
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const colors = ['#00ff88', '#00d4ff', '#ffd700', '#ff3366', '#8a2be2'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: click-particle 1s ease-out forwards;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    create3DEffects() {
        const cards = document.querySelectorAll('.skill-card, .stat-item, .quote-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }
}

// Quotes Slider
class QuotesSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.quote-card');
        this.dotsContainer = document.querySelector('.quote-dots');
        this.prevBtn = document.querySelector('.quote-nav-btn.prev');
        this.nextBtn = document.querySelector('.quote-nav-btn.next');
        
        this.init();
    }

    init() {
        this.createDots();
        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.showSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot');
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    startAutoPlay() {
        // Автоматическое листание отключено
        // setInterval(() => {
        //     this.nextSlide();
        // }, 5000);
    }
}

// Animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .stat-item, .quote-card, .about-paragraph');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize components
    new QuotesSlider();
    new InteractiveEffects();

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease';
            heroTitle.style.opacity = '1';
        }, 500);
    }

    // Add floating particles effect
    createParticles();

    // Add pyramid interaction effects
    addPyramidEffects();
});

// Floating particles effect
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#00ff88', '#00d4ff', '#ffd700', '#ff3366', '#8a2be2'][Math.floor(Math.random() * 5)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Pyramid interaction effects
function addPyramidEffects() {
    const pyramid = document.querySelector('.hero-pyramid');
    const orbs = document.querySelectorAll('.pyramid-orb');
    
    if (!pyramid) return;

    // Mouse move effect for pyramid
    pyramid.addEventListener('mousemove', (e) => {
        const rect = pyramid.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 20;
        const rotateY = (x / rect.width) * 20;
        
        pyramid.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    // Reset pyramid position on mouse leave
    pyramid.addEventListener('mouseleave', () => {
        pyramid.style.transform = '';
    });

    // Orb click effects
    orbs.forEach((orb, index) => {
        orb.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 100px;
                height: 100px;
                border: 2px solid ${orb.style.background || '#ffd700'};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: orbRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            pyramid.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Change pyramid rotation speed temporarily
            pyramid.style.animationDuration = '2s';
            setTimeout(() => {
                pyramid.style.animationDuration = '15s';
            }, 2000);
        });
    });
}

// Add CSS for particles and orb effects
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes orbRipple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const pyramid = document.querySelector('.hero-pyramid');
    
    if (hero && pyramid) {
        const rotateY = scrolled * 0.1;
        const translateY = scrolled * 0.2;
        pyramid.style.transform = `rotateY(${rotateY}deg) translateY(${translateY}px)`;
    }
});

// Add glow effect to buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add cursor trail effect
let mouseX = 0, mouseY = 0;
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorTrail.length < 10) {
        cursorTrail.push({ x: mouseX, y: mouseY });
    } else {
        cursorTrail.shift();
        cursorTrail.push({ x: mouseX, y: mouseY });
    }
    
    // Create trail effect
    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: ${['#00ff88', '#00d4ff', '#ffd700'][index % 3]};
            border-radius: 50%;
            left: ${pos.x}px;
            top: ${pos.y}px;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - index * 0.1};
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 100);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space to pause/resume animations
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        document.body.classList.toggle('paused');
    }
});

// Add pause animation CSS
const pauseStyle = document.createElement('style');
pauseStyle.textContent = `
    body.paused * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(pauseStyle);

// Система вопросов-ответов и опроса
class QASystem {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.init();
    }

    init() {
        this.bindFAQEvents();
        this.bindSurveyEvents();
        this.createSurveyQuestions();
    }

    bindFAQEvents() {
        // Обработка кликов по FAQ кнопкам
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const questionType = btn.getAttribute('data-question');
                this.showAnswer(questionType, btn);
            });
        });
    }

    showAnswer(questionType, clickedBtn) {
        // Убираем активный класс со всех кнопок
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Скрываем все ответы
        document.querySelectorAll('.ai-answer').forEach(answer => {
            answer.style.display = 'none';
        });

        // Показываем нужный ответ
        const answerElement = document.getElementById(`answer-${questionType}`);
        if (answerElement) {
            answerElement.style.display = 'flex';
            clickedBtn.classList.add('active');
            
            // Плавная прокрутка к ответу
            answerElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    bindSurveyEvents() {
        // Кнопка начала опроса
        document.getElementById('start-survey').addEventListener('click', () => {
            this.startSurvey();
        });

        // Закрытие модального окна опроса
        document.getElementById('survey-close').addEventListener('click', () => {
            this.closeSurvey();
        });

        // Навигация по опросу
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-question').addEventListener('click', () => {
            this.prevQuestion();
        });

        // Закрытие результатов
        document.getElementById('results-close').addEventListener('click', () => {
            this.closeResults();
        });

        // Действия с результатами
        document.getElementById('join-community').addEventListener('click', () => {
            window.open('https://t.me/PodMotivX', '_blank');
        });

        document.getElementById('restart-survey').addEventListener('click', () => {
            this.restartSurvey();
        });
    }

    createSurveyQuestions() {
        this.questions = [
            {
                id: 1,
                question: "Какой у вас текущий уровень дохода?",
                options: [
                    "До 50,000 ₽ в месяц",
                    "50,000 - 100,000 ₽ в месяц", 
                    "100,000 - 300,000 ₽ в месяц",
                    "Более 300,000 ₽ в месяц"
                ]
            },
            {
                id: 2,
                question: "Какой у вас опыт в бизнесе?",
                options: [
                    "Нет опыта, только начинаю",
                    "Есть небольшой опыт (1-2 года)",
                    "Опытный предприниматель (3-5 лет)",
                    "Профессионал (более 5 лет)"
                ]
            },
            {
                id: 3,
                question: "Какая сфера вас больше всего интересует?",
                options: [
                    "Интернет-бизнес и IT",
                    "Торговля и розница",
                    "Услуги и консалтинг",
                    "Инвестиции и финансы",
                    "Производство и промышленность"
                ]
            },
            {
                id: 4,
                question: "Сколько времени вы готовы уделять развитию?",
                options: [
                    "1-2 часа в неделю",
                    "3-5 часов в неделю",
                    "1-2 часа в день",
                    "Более 3 часов в день"
                ]
            },
            {
                id: 5,
                question: "Какой у вас уровень финансовой грамотности?",
                options: [
                    "Базовый - знаю основы",
                    "Средний - понимаю инвестиции",
                    "Высокий - активно инвестирую",
                    "Экспертный - профессионально работаю с финансами"
                ]
            },
            {
                id: 6,
                question: "Какая ваша главная цель?",
                options: [
                    "Создать пассивный доход",
                    "Построить крупный бизнес",
                    "Стать финансово независимым",
                    "Достичь финансовой свободы"
                ]
            },
            {
                id: 7,
                question: "Какой у вас стиль принятия решений?",
                options: [
                    "Консервативный - предпочитаю стабильность",
                    "Умеренный - взвешиваю риски",
                    "Агрессивный - готов к высоким рискам",
                    "Инновационный - ищу новые возможности"
                ]
            },
            {
                id: 8,
                question: "Какие ресурсы у вас есть для старта?",
                options: [
                    "Только время и желание",
                    "Небольшие сбережения (до 100,000 ₽)",
                    "Средний капитал (100,000 - 1,000,000 ₽)",
                    "Значительный капитал (более 1,000,000 ₽)"
                ]
            },
            {
                id: 9,
                question: "Какой у вас уровень стрессоустойчивости?",
                options: [
                    "Низкий - легко выбиваюсь из колеи",
                    "Средний - справляюсь с обычными стрессами",
                    "Высокий - хорошо переношу давление",
                    "Очень высокий - стресс мотивирует меня"
                ]
            },
            {
                id: 10,
                question: "Как вы относитесь к обучению?",
                options: [
                    "Предпочитаю учиться самостоятельно",
                    "Люблю курсы и тренинги",
                    "Ищу ментора или коуча",
                    "Учусь постоянно и везде"
                ]
            },
            {
                id: 11,
                question: "Какая у вас сильная сторона?",
                options: [
                    "Креативность и генерация идей",
                    "Аналитическое мышление",
                    "Коммуникация и продажи",
                    "Организация и управление"
                ]
            },
            {
                id: 12,
                question: "Какой у вас опыт работы в команде?",
                options: [
                    "Предпочитаю работать один",
                    "Умею работать в команде",
                    "Опыт управления небольшими командами",
                    "Опыт руководства крупными проектами"
                ]
            },
            {
                id: 13,
                question: "Как вы относитесь к технологиям?",
                options: [
                    "Использую базовые технологии",
                    "Слежу за трендами",
                    "Активно внедряю новые технологии",
                    "Создаю технологические решения"
                ]
            },
            {
                id: 14,
                question: "Какая у вас география работы?",
                options: [
                    "Локальный рынок (город/регион)",
                    "Национальный рынок",
                    "Международный рынок",
                    "Глобальный онлайн-бизнес"
                ]
            },
            {
                id: 15,
                question: "Какой у вас временной горизонт планирования?",
                options: [
                    "Краткосрочное планирование (до 1 года)",
                    "Среднесрочное планирование (1-3 года)",
                    "Долгосрочное планирование (3-10 лет)",
                    "Стратегическое планирование (10+ лет)"
                ]
            },
            {
                id: 16,
                question: "Какой у вас опыт в маркетинге?",
                options: [
                    "Базовые знания",
                    "Опыт в традиционном маркетинге",
                    "Опыт в цифровом маркетинге",
                    "Эксперт в маркетинге"
                ]
            },
            {
                id: 17,
                question: "Какая у вас сеть контактов?",
                options: [
                    "Небольшая сеть знакомых",
                    "Профессиональные контакты в своей сфере",
                    "Широкая сеть в разных сферах",
                    "Мощная сеть влиятельных людей"
                ]
            },
            {
                id: 18,
                question: "Какой у вас уровень самодисциплины?",
                options: [
                    "Требуется внешний контроль",
                    "Средний уровень самодисциплины",
                    "Высокий уровень самодисциплины",
                    "Железная самодисциплина"
                ]
            }
        ];
    }

    startSurvey() {
        this.currentQuestion = 0;
        this.answers = {};
        document.getElementById('survey-modal').classList.add('active');
        this.showQuestion(0);
        this.updateProgress();
    }

    showQuestion(index) {
        const question = this.questions[index];
        const content = document.getElementById('survey-content');
        
        content.innerHTML = `
            <div class="question-block active">
                <h4>${question.question}</h4>
                <div class="question-options">
                    ${question.options.map((option, i) => `
                        <button class="option-btn" data-value="${i}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Добавляем обработчики для вариантов ответов
        content.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                content.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.answers[question.id] = parseInt(btn.getAttribute('data-value'));
            });
        });

        // Показываем/скрываем кнопки навигации
        document.getElementById('prev-question').style.display = index > 0 ? 'block' : 'none';
        document.getElementById('next-question').textContent = index === this.questions.length - 1 ? 'Завершить' : 'Далее';
    }

    nextQuestion() {
        const currentQ = this.questions[this.currentQuestion];
        
        // Проверяем, выбран ли ответ
        if (this.answers[currentQ.id] === undefined) {
            alert('Пожалуйста, выберите ответ на вопрос');
            return;
        }

        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
            this.updateProgress();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('survey-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `Вопрос ${this.currentQuestion + 1} из ${this.questions.length}`;
    }

    showResults() {
        document.getElementById('survey-modal').classList.remove('active');
        document.getElementById('results-modal').classList.add('active');
        
        const results = this.analyzeAnswers();
        this.displayResults(results);
    }

    analyzeAnswers() {
        // Анализируем ответы и формируем рекомендации
        const analysis = {
            profile: this.determineProfile(),
            strengths: this.identifyStrengths(),
            weaknesses: this.identifyWeaknesses(),
            recommendations: this.generateRecommendations(),
            timeline: this.calculateTimeline(),
            resources: this.suggestResources()
        };
        
        return analysis;
    }

    determineProfile() {
        const income = this.answers[1] || 0;
        const experience = this.answers[2] || 0;
        const risk = this.answers[7] || 0;
        
        if (income <= 1 && experience <= 1) return "Новичок";
        if (income >= 2 && experience >= 2) return "Опытный";
        if (risk >= 2) return "Инноватор";
        return "Консерватор";
    }

    identifyStrengths() {
        const strengths = [];
        const answers = this.answers;
        
        if (answers[11] >= 2) strengths.push("Сильные аналитические способности");
        if (answers[12] >= 2) strengths.push("Опыт работы в команде");
        if (answers[13] >= 2) strengths.push("Технологическая грамотность");
        if (answers[17] >= 2) strengths.push("Хорошая сеть контактов");
        if (answers[18] >= 2) strengths.push("Высокая самодисциплина");
        
        return strengths.length > 0 ? strengths : ["Мотивация и желание развиваться"];
    }

    identifyWeaknesses() {
        const weaknesses = [];
        const answers = this.answers;
        
        if (answers[5] <= 1) weaknesses.push("Низкий уровень финансовой грамотности");
        if (answers[8] <= 1) weaknesses.push("Ограниченные финансовые ресурсы");
        if (answers[9] <= 1) weaknesses.push("Низкая стрессоустойчивость");
        if (answers[16] <= 1) weaknesses.push("Недостаток опыта в маркетинге");
        
        return weaknesses;
    }

    generateRecommendations() {
        const profile = this.determineProfile();
        const recommendations = [];
        
        switch(profile) {
            case "Новичок":
                recommendations.push("Начните с изучения основ финансовой грамотности");
                recommendations.push("Создайте подушку безопасности (6 месячных зарплат)");
                recommendations.push("Изучите основы предпринимательства");
                recommendations.push("Найдите ментора или присоединитесь к сообществу");
                break;
            case "Опытный":
                recommendations.push("Масштабируйте существующий бизнес");
                recommendations.push("Диверсифицируйте источники дохода");
                recommendations.push("Инвестируйте в новые технологии");
                recommendations.push("Стройте команду профессионалов");
                break;
            case "Инноватор":
                recommendations.push("Исследуйте новые рынки и технологии");
                recommendations.push("Создавайте инновационные продукты");
                recommendations.push("Привлекайте инвестиции для роста");
                recommendations.push("Стройте сильный бренд");
                break;
            case "Консерватор":
                recommendations.push("Фокусируйтесь на стабильных инвестициях");
                recommendations.push("Постепенно расширяйте бизнес");
                recommendations.push("Создавайте пассивный доход");
                recommendations.push("Защищайте капитал от рисков");
                break;
        }
        
        return recommendations;
    }

    calculateTimeline() {
        const profile = this.determineProfile();
        const experience = this.answers[2] || 0;
        const resources = this.answers[8] || 0;
        
        let timeline = "3-5 лет";
        
        if (profile === "Новичок") timeline = "5-7 лет";
        if (profile === "Опытный") timeline = "2-3 года";
        if (profile === "Инноватор") timeline = "1-3 года";
        if (resources >= 2) timeline = "2-4 года";
        
        return timeline;
    }

    suggestResources() {
        const resources = [
            "Подписка на PodMotivX в Telegram",
            "Книги по финансовой грамотности",
            "Онлайн-курсы по предпринимательству",
            "Менторство и коучинг",
            "Профессиональные сообщества"
        ];
        
        return resources;
    }

    displayResults(results) {
        const content = document.getElementById('results-content');
        
        content.innerHTML = `
            <div class="result-section">
                <h4>🎯 Ваш профиль: ${results.profile}</h4>
                <p>На основе ваших ответов мы определили ваш тип предпринимателя и подготовили персональные рекомендации.</p>
            </div>
            
            <div class="result-section">
                <h4>💪 Ваши сильные стороны</h4>
                <ul>
                    ${results.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>
            
            ${results.weaknesses.length > 0 ? `
                <div class="result-section">
                    <h4>⚠️ Области для развития</h4>
                    <ul>
                        ${results.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="result-section">
                <h4>🚀 Персональные рекомендации</h4>
                <ul>
                    ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>⏰ Временные рамки</h4>
                <p>Для достижения ваших целей потребуется примерно <strong>${results.timeline}</strong> при правильном подходе и регулярной работе.</p>
            </div>
            
            <div class="result-section">
                <h4>📚 Рекомендуемые ресурсы</h4>
                <ul>
                    ${results.resources.map(resource => `<li>${resource}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>🎉 Следующие шаги</h4>
                <p>Присоединяйтесь к сообществу PodMotivX, где вы получите поддержку, мотивацию и практические советы для достижения ваших целей!</p>
            </div>
        `;
    }

    closeSurvey() {
        document.getElementById('survey-modal').classList.remove('active');
    }

    closeResults() {
        document.getElementById('results-modal').classList.remove('active');
    }

    restartSurvey() {
        this.closeResults();
        this.startSurvey();
    }
}

// Инициализация системы вопросов-ответов
let qaSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Инициализируем систему вопросов-ответов
    qaSystem = new QASystem();
}); 