// PodMotivX Platform JavaScript

class PodMotivXPlatform {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupInteractiveElements();
    }

    setupTheme() {
        // Устанавливаем начальную тему
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();

        // Обработчик переключения темы
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    setupNavigation() {
        // Мобильное меню
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Закрытие мобильного меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Активная ссылка в навигации
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        // Плавная прокрутка к секциям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Анимация появления элементов при скролле
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

        // Наблюдаем за элементами для анимации
        document.querySelectorAll('.leaderx-card, .mindmotivx-card, .course-card, .feature-card, .blog-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupInteractiveElements() {
        // Обработчики для кнопок
        this.setupButtonHandlers();
        
        // Фильтрация блога
        this.setupBlogFilter();
        
        // Интерактивные карточки
        this.setupInteractiveCards();
    }

    setupButtonHandlers() {
        // Кнопка "Начать путь лидера"
        const leaderBtn = document.querySelector('.leaderx-cta .btn');
        if (leaderBtn) {
            leaderBtn.addEventListener('click', () => {
                window.location.href = 'leaderx.html';
            });
        }

        // Кнопки курсов
        document.querySelectorAll('.course-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'akademiyax.html';
            });
        });

        // Кнопки присоединения к комьюнити
        document.querySelectorAll('.community-cta .btn, .nav-actions .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!btn.href || btn.href.includes('#')) {
                    e.preventDefault();
                    this.showModal('community-join', 'Присоединиться к комьюнити');
                }
            });
        });
    }

    setupBlogFilter() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.textContent.toLowerCase();
                
                // Обновляем активную кнопку
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Фильтруем карточки
                blogCards.forEach(card => {
                    const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
                    if (category === 'все' || cardCategory === category) {
                        card.style.display = 'block';
                        card.classList.add('animate-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-in');
                    }
                });
            });
        });
    }

    setupInteractiveCards() {
        // Интерактивные карточки в hero секции
        document.querySelectorAll('.hero-cards .card').forEach(card => {
            card.addEventListener('click', () => {
                const sectionName = card.querySelector('span').textContent;
                const sectionId = this.getSectionId(sectionName);
                if (sectionId) {
                    window.location.href = sectionId + '.html';
                }
            });
        });

        // Hover эффекты для карточек
        document.querySelectorAll('.leaderx-card, .mindmotivx-card, .course-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    getSectionId(sectionName) {
        const sectionMap = {
            'LeaderX': 'leaderx',
            'MindMotivX': 'mindmotivx',
            'AkademiyaX': 'akademiyax',
            'InvestX': 'investx'
        };
        return sectionMap[sectionName];
    }

    showModal(type, title) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${this.getModalContent(type)}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Анимация появления
        setTimeout(() => modal.classList.add('active'), 10);

        // Закрытие модального окна
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    getModalContent(type) {
        const contentMap = {
            'leader-test': `
                <div class="test-intro">
                    <p>Пройдите тест из 10 вопросов, чтобы определить ваш тип лидерства и получить персональную программу развития.</p>
                    <div class="test-preview">
                        <h4>Вопросы теста:</h4>
                        <ul>
                            <li>Как вы принимаете решения в команде?</li>
                            <li>Как вы мотивируете других?</li>
                            <li>Как вы справляетесь с конфликтами?</li>
                            <li>Как вы планируете долгосрочные цели?</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="window.open('https://t.me/PodMotivX', '_blank')">
                        <i class="fab fa-telegram"></i> Пройти тест в Telegram
                    </button>
                </div>
            `,
            'community-join': `
                <div class="community-intro">
                    <p>Присоединяйтесь к сообществу единомышленников и начните свой путь к успеху вместе с PodMotivX!</p>
                    <div class="community-benefits">
                        <h4>Преимущества сообщества:</h4>
                        <ul>
                            <li>Поддержка единомышленников</li>
                            <li>Обмен опытом и знаниями</li>
                            <li>Система достижений</li>
                            <li>Персональные карточки участников</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="window.open('https://t.me/PodMotivX', '_blank')">
                        <i class="fab fa-telegram"></i> Присоединиться к комьюнити
                    </button>
                </div>
            `
        };

        return contentMap[type] || '<p>Контент загружается...</p>';
    }
}

// Инициализация платформы
document.addEventListener('DOMContentLoaded', () => {
    new PodMotivXPlatform();
});

// Добавляем стили для модальных окон
const modalStyles = `
<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.active {
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal-content {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
    color: var(--text-primary);
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.modal-body {
    padding: 1.5rem;
}

.modal-body p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.modal-body h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.modal-body ul {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
}

.modal-body li {
    margin-bottom: 0.5rem;
}

.test-preview, .game-features, .course-benefits, .community-benefits {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Мобильное меню */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--border-color);
        padding: 1rem;
        flex-direction: column;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-lg);
    }

    .nav-menu.active {
        transform: translateY(0);
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles); 