// About - О нас
class About {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.animateStats();
    }
    
    setupEventListeners() {
        // Кнопки навигации
        document.getElementById('learn-more')?.addEventListener('click', () => {
            this.scrollToMission();
        });
        
        document.getElementById('meet-team')?.addEventListener('click', () => {
            this.scrollToTeam();
        });
        
        // Форма контактов
        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitContactForm(e.target);
        });
        
        // Социальные ссылки команды
        document.querySelectorAll('.member-social a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSocialLink(link.href);
            });
        });
        
        // Переключение темы
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Мобильное меню
        document.getElementById('nav-toggle')?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    }
    
    setupAnimations() {
        // Анимация плавающих элементов
        this.animateFloatingElements();
        
        // Анимация карточек при скролле
        this.setupScrollAnimations();
        
        // Анимация статистики
        this.setupStatsAnimation();
    }
    
    animateFloatingElements() {
        const elements = document.querySelectorAll('.floating-elements .element');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
            element.classList.add('animate-float');
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за карточками
        document.querySelectorAll('.team-member, .value-card, .stat-card, .contact-method').forEach(card => {
            observer.observe(card);
        });
    }
    
    setupStatsAnimation() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            this.animateNumber(stat, 0, target, 2000);
        });
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    
    scrollToMission() {
        const missionSection = document.querySelector('.mission-section');
        missionSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    scrollToTeam() {
        const teamSection = document.getElementById('team-section');
        teamSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    submitContactForm(form) {
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        if (name && email && message) {
            this.showNotification('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();
        } else {
            this.showNotification('Пожалуйста, заполните все поля формы.', 'error');
        }
    }
    
    showSocialLink(url) {
        this.showNotification('Переход к социальной сети...', 'info');
        // Здесь можно добавить логику перехода к социальной сети
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    toggleMobileMenu() {
        document.querySelector('.nav-menu').classList.toggle('active');
        document.querySelector('.nav-toggle').classList.toggle('active');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new About();
    
    // Добавляем стили для анимаций и уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ff4444, #cc0000);
            box-shadow: 0 10px 25px rgba(255, 68, 68, 0.3);
        }
        
        .notification.success {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
        }
        
        .back-to-main {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }
        
        .back-to-main .btn {
            background: linear-gradient(135deg, #ff8800, #ff6600);
            border: none;
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 10px 25px rgba(255, 136, 0, 0.3);
            transition: all 0.3s ease;
            font-weight: 600;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .back-to-main .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(255, 136, 0, 0.4);
        }
        
        /* Анимации */
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-15px) rotate(5deg); }
            50% { transform: translateY(-10px) rotate(0deg); }
            75% { transform: translateY(-20px) rotate(-5deg); }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .team-member, .value-card, .stat-card, .contact-method {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        
        .team-member.animate-in, .value-card.animate-in, 
        .stat-card.animate-in, .contact-method.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Эффекты наведения */
        .team-member:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .value-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 255, 136, 0.1);
        }
        
        .stat-card:hover {
            transform: scale(1.05);
        }
        
        /* Анимация статистики */
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Социальные ссылки */
        .member-social a {
            transition: all 0.3s ease;
        }
        
        .member-social a:hover {
            transform: scale(1.2);
            color: #00ff88;
        }
        
        /* Навыки */
        .member-skills .skill {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            margin: 2px;
            display: inline-block;
        }
        
        /* Форма контактов */
        .contact-form input,
        .contact-form textarea {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .contact-form input:focus,
        .contact-form textarea:focus {
            outline: none;
            border-color: #00ff88;
            box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }
        
        /* Методы контакта */
        .contact-method {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }
        
        .contact-method:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(10px);
        }
        
        .method-icon {
            font-size: 2rem;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            border-radius: 50%;
            color: white;
        }
        
        /* Эффект пульсации для статистики */
        .stat-card {
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        /* Анимация миссии */
        .mission-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }
        
        .mission-image {
            position: relative;
            height: 400px;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8rem;
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Ценности */
        .mission-values {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .value-item {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            transition: all 0.3s ease;
        }
        
        .value-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px);
        }
        
        .value-icon {
            font-size: 3rem;
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(style);
}); 