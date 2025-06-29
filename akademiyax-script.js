// AkademiyaX - Образовательная платформа
class AkademiyaX {
    constructor() {
        this.currentCategory = 'all';
        this.courses = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.loadCourses();
    }
    
    setupEventListeners() {
        // Кнопки навигации
        document.getElementById('browse-courses')?.addEventListener('click', () => {
            this.scrollToCategories();
        });
        
        document.getElementById('free-trial')?.addEventListener('click', () => {
            this.showFreeTrialModal();
        });
        
        // Категории курсов
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.filterByCategory(e.currentTarget.dataset.category);
            });
        });
        
        // Курсы
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.course-footer')) {
                    this.openCourse(card);
                }
            });
        });
        
        // Кнопки записи на курсы
        document.querySelectorAll('.course-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseCard = e.target.closest('.course-card');
                const courseTitle = courseCard.querySelector('h3').textContent;
                this.enrollInCourse(courseTitle);
            });
        });
        
        // Кнопки действий
        document.getElementById('view-all-courses')?.addEventListener('click', () => {
            this.showAllCourses();
        });
        
        document.getElementById('course-finder')?.addEventListener('click', () => {
            this.showCourseFinder();
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
        // Анимация плавающих курсов
        this.animateFloatingCourses();
        
        // Анимация статистики
        this.animateStats();
        
        // Анимация карточек при скролле
        this.setupScrollAnimations();
    }
    
    animateFloatingCourses() {
        const courses = document.querySelectorAll('.course-cards .course-preview');
        courses.forEach((course, index) => {
            course.style.animationDelay = `${index * 0.3}s`;
            course.classList.add('animate-float');
        });
    }
    
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            if (finalValue.includes('+')) {
                const numValue = parseInt(finalValue.replace('+', ''));
                this.animateNumber(stat, 0, numValue, 2000, '+');
            } else if (finalValue.includes('K')) {
                const numValue = parseInt(finalValue.replace('K', ''));
                this.animateNumber(stat, 0, numValue, 2000, 'K');
            } else {
                const numValue = parseInt(finalValue);
                this.animateNumber(stat, 0, numValue, 2000);
            }
        });
    }
    
    animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + suffix;
            
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
        document.querySelectorAll('.category-card, .course-card, .path-step').forEach(card => {
            observer.observe(card);
        });
    }
    
    scrollToCategories() {
        const categoriesSection = document.getElementById('categories-section');
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        // Обновляем активную категорию
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Фильтруем курсы
        const courses = document.querySelectorAll('.course-card');
        courses.forEach(course => {
            if (category === 'all' || course.dataset.category === category) {
                course.style.display = 'block';
                course.classList.add('animate-in');
            } else {
                course.style.display = 'none';
            }
        });
        
        this.showNotification(`Показаны курсы категории: ${this.getCategoryName(category)}`, 'info');
    }
    
    getCategoryName(category) {
        const names = {
            'business': 'Бизнес-стратегии',
            'marketing': 'Маркетинг и продажи',
            'finance': 'Финансы и инвестиции',
            'leadership': 'Лидерство и команда',
            'productivity': 'Продуктивность',
            'technology': 'Технологии'
        };
        return names[category] || category;
    }
    
    openCourse(card) {
        const title = card.querySelector('h3').textContent;
        this.showNotification(`Открывается курс: "${title}"`, 'info');
        // Здесь можно добавить логику открытия курса
    }
    
    enrollInCourse(courseTitle) {
        this.showNotification(`Вы успешно записались на курс "${courseTitle}"!`, 'success');
        
        // Анимация кнопки
        const btn = event.target;
        btn.textContent = 'Записан';
        btn.classList.add('enrolled');
        btn.disabled = true;
    }
    
    showFreeTrialModal() {
        this.showNotification('Бесплатный доступ будет доступен в ближайшее время!', 'info');
    }
    
    showAllCourses() {
        this.showNotification('Переход к полному каталогу курсов...', 'info');
        // Здесь можно добавить логику перехода к полному каталогу
    }
    
    showCourseFinder() {
        this.showNotification('Функция поиска курсов будет доступна в ближайшее время!', 'info');
    }
    
    loadCourses() {
        // Здесь можно добавить загрузку курсов с сервера
        this.courses = [
            {
                id: 1,
                title: 'Основы предпринимательства: от идеи до бизнеса',
                category: 'business',
                instructor: 'Александр К.',
                rating: 4.9,
                reviews: 1245,
                price: 15000,
                originalPrice: 25000,
                duration: '12 часов',
                lessons: 48,
                students: 2450
            },
            // Добавьте больше курсов по необходимости
        ];
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
    new AkademiyaX();
    
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
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-2deg); }
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
        
        .category-card, .course-card, .path-step {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        
        .category-card.animate-in, .course-card.animate-in, .path-step.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Эффекты наведения */
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 255, 136, 0.1);
        }
        
        .course-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .path-step:hover {
            transform: translateX(10px);
        }
        
        /* Категории */
        .category-card.active {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            transform: scale(1.05);
        }
        
        /* Курсы */
        .course-card.featured {
            border: 2px solid #00ff88;
        }
        
        .course-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: linear-gradient(135deg, #ff8800, #ff6600);
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .course-rating {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 12px;
        }
        
        /* Путь обучения */
        .path-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .path-step {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
        }
        
        .step-number {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            flex-shrink: 0;
        }
        
        .step-courses {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .course-tag {
            background: rgba(0, 255, 136, 0.2);
            color: #00ff88;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
        }
        
        /* Цены */
        .price {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .current-price {
            font-size: 1.2rem;
            font-weight: 700;
            color: #00ff88;
        }
        
        .original-price {
            font-size: 1rem;
            color: #999;
            text-decoration: line-through;
        }
        
        /* Кнопка записи */
        .btn.enrolled {
            background: linear-gradient(135deg, #00cc6a, #00ff88);
            color: white;
        }
        
        /* Эффект пульсации для статистики */
        .stat-number {
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Анимация курсов */
        .course-cards .course-preview {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .course-cards .course-preview:hover {
            transform: scale(1.05);
            background: rgba(255, 255, 255, 0.2);
        }
        
        .course-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .course-level {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}); 