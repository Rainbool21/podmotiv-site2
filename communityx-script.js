// CommunityX - Сообщество
class CommunityX {
    constructor() {
        this.currentCategory = 'all';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
    }
    
    setupEventListeners() {
        // Кнопки навигации
        document.getElementById('view-events')?.addEventListener('click', () => {
            this.scrollToEvents();
        });
        
        // Категории форума
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.filterTopics(e.target.dataset.category);
            });
        });
        
        // Кнопки форума
        document.getElementById('create-topic')?.addEventListener('click', () => {
            this.showCreateTopicModal();
        });
        
        document.getElementById('view-all-topics')?.addEventListener('click', () => {
            this.showAllTopics();
        });
        
        // Кнопки событий
        document.querySelectorAll('.event-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventCard = e.target.closest('.event-card');
                const eventTitle = eventCard.querySelector('h3').textContent;
                this.registerForEvent(eventTitle);
            });
        });
        
        // Кнопки участников
        document.querySelectorAll('.member-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const memberCard = e.target.closest('.member-card');
                const memberName = memberCard.querySelector('h4').textContent;
                this.contactMember(memberName);
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
        // Анимация аватаров участников
        this.animateMemberAvatars();
        
        // Анимация статистики
        this.animateStats();
        
        // Анимация карточек при скролле
        this.setupScrollAnimations();
    }
    
    animateMemberAvatars() {
        const avatars = document.querySelectorAll('.member-avatars .avatar');
        avatars.forEach((avatar, index) => {
            avatar.style.animationDelay = `${index * 0.2}s`;
            avatar.classList.add('animate-float');
        });
    }
    
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/,/g, ''));
            this.animateNumber(stat, 0, finalValue, 2000);
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
        document.querySelectorAll('.feature-card, .event-card, .member-card, .topic-item').forEach(card => {
            observer.observe(card);
        });
    }
    
    scrollToEvents() {
        const eventsSection = document.getElementById('events-section');
        eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    filterTopics(category) {
        this.currentCategory = category;
        
        // Обновляем активную вкладку
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Фильтруем темы
        const topics = document.querySelectorAll('.topic-item');
        topics.forEach(topic => {
            if (category === 'all' || topic.dataset.category === category) {
                topic.style.display = 'flex';
                topic.classList.add('animate-in');
            } else {
                topic.style.display = 'none';
            }
        });
    }
    
    showCreateTopicModal() {
        this.showNotification('Функция создания тем будет доступна в ближайшее время!', 'info');
    }
    
    showAllTopics() {
        this.showNotification('Переход к полному списку тем...', 'info');
        // Здесь можно добавить логику перехода к полному списку
    }
    
    registerForEvent(eventTitle) {
        this.showNotification(`Вы успешно записались на "${eventTitle}"!`, 'success');
        
        // Анимация кнопки
        const btn = event.target;
        btn.textContent = 'Записан';
        btn.classList.add('registered');
        btn.disabled = true;
    }
    
    contactMember(memberName) {
        this.showNotification(`Открывается чат с ${memberName}...`, 'info');
        // Здесь можно добавить логику открытия чата
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
        document.body.classList.toggle('dark-theme');
        const icon = document.querySelector('#theme-toggle i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    toggleMobileMenu() {
        document.querySelector('.nav-menu').classList.toggle('active');
        document.querySelector('.nav-toggle').classList.toggle('active');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new CommunityX();
    
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
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
        
        .feature-card, .event-card, .member-card, .topic-item {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .feature-card.animate-in, .event-card.animate-in, 
        .member-card.animate-in, .topic-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Кнопка регистрации */
        .btn.registered {
            background: linear-gradient(135deg, #00cc6a, #00ff88);
            color: white;
        }
        
        /* Анимация аватаров */
        .member-avatars .avatar {
            transition: all 0.3s ease;
        }
        
        .member-avatars .avatar:hover {
            transform: scale(1.1) rotate(5deg);
        }
        
        /* Эффект пульсации для статистики */
        .stat-number {
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}); 