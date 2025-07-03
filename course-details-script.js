// Course Details - Детальная страница курса
class CourseDetails {
    constructor() {
        this.currentTab = 'overview';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupVideoPlayer();
    }
    
    setupEventListeners() {
        // Табы контента
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // Кнопки действий
        document.getElementById('enroll-course')?.addEventListener('click', () => {
            this.enrollInCourse();
        });
        
        document.getElementById('preview-course')?.addEventListener('click', () => {
            this.previewCourse();
        });
        
        document.getElementById('buy-course')?.addEventListener('click', () => {
            this.buyCourse();
        });
        
        // Уроки
        document.querySelectorAll('.lesson').forEach(lesson => {
            lesson.addEventListener('click', (e) => {
                this.openLesson(e.currentTarget);
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
    
    setupVideoPlayer() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', () => {
                this.playVideo();
            });
        }
    }
    
    switchTab(tabName) {
        // Убираем активный класс со всех табов
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Активируем нужный таб
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        this.currentTab = tabName;
    }
    
    enrollInCourse() {
        this.showNotification('Вы успешно записались на курс!', 'success');
        
        // Анимация кнопки
        const btn = event.target;
        btn.textContent = 'Записан';
        btn.classList.add('enrolled');
        btn.disabled = true;
    }
    
    previewCourse() {
        this.showNotification('Открывается предварительный просмотр курса...', 'info');
        // Здесь можно добавить логику открытия превью
    }
    
    buyCourse() {
        this.showNotification('Переход к оплате курса...', 'info');
        // Здесь можно добавить логику покупки
    }
    
    openLesson(lessonElement) {
        const lessonTitle = lessonElement.querySelector('span').textContent;
        this.showNotification(`Открывается урок: ${lessonTitle}`, 'info');
        
        // Анимация урока
        lessonElement.style.background = 'rgba(0, 255, 136, 0.1)';
        setTimeout(() => {
            lessonElement.style.background = '';
        }, 1000);
    }
    
    playVideo() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        videoPlaceholder.innerHTML = `
            <div class="video-player">
                <iframe width="100%" height="315" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
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
    new CourseDetails();
    
    // Добавляем стили для страницы курса
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
        
        .notification.success {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
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
        
        /* Стили для страницы курса */
        .course-hero {
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: white;
            padding: 80px 0;
        }
        
        .course-hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            align-items: center;
        }
        
        .course-breadcrumb {
            margin-bottom: 20px;
        }
        
        .course-breadcrumb a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
        }
        
        .course-breadcrumb a:hover {
            color: white;
        }
        
        .course-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 30px 0;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .course-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .video-player {
            background: #000;
            border-radius: 15px;
            overflow: hidden;
            aspect-ratio: 16/9;
        }
        
        .video-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #333, #666);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .video-placeholder:hover {
            background: linear-gradient(135deg, #444, #777);
        }
        
        .video-placeholder i {
            font-size: 4rem;
            margin-bottom: 15px;
        }
        
        .course-content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 50px;
            margin: 50px 0;
        }
        
        .content-tabs {
            display: flex;
            border-bottom: 2px solid #eee;
            margin-bottom: 30px;
        }
        
        .tab-btn {
            padding: 15px 30px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }
        
        .tab-btn.active {
            color: #00ff88;
            border-bottom-color: #00ff88;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .module {
            border: 1px solid #eee;
            border-radius: 10px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .module-header {
            background: #f8f9fa;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .lesson-list {
            padding: 0;
        }
        
        .lesson {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lesson:hover {
            background: rgba(0, 255, 136, 0.05);
        }
        
        .lesson:last-child {
            border-bottom: none;
        }
        
        .lesson i {
            color: #00ff88;
            width: 20px;
        }
        
        .lesson-duration {
            margin-left: auto;
            color: #666;
            font-size: 14px;
        }
        
        .course-sidebar .course-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 20px;
        }
        
        .course-price {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .current-price {
            font-size: 2rem;
            font-weight: 700;
            color: #00ff88;
        }
        
        .original-price {
            font-size: 1.2rem;
            color: #999;
            text-decoration: line-through;
            margin-left: 10px;
        }
        
        .discount {
            background: #ff4444;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 10px;
        }
        
        .course-includes {
            margin: 30px 0;
        }
        
        .course-includes ul {
            list-style: none;
            padding: 0;
        }
        
        .course-includes li {
            padding: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .course-includes i {
            color: #00ff88;
            width: 20px;
        }
        
        .guarantee {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            background: rgba(0, 255, 136, 0.1);
            border-radius: 10px;
            color: #00ff88;
            font-weight: 600;
        }
        
        .instructor-profile {
            display: flex;
            gap: 30px;
            align-items: flex-start;
        }
        
        .instructor-avatar {
            font-size: 4rem;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .instructor-stats {
            display: flex;
            gap: 30px;
            margin-top: 20px;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: #00ff88;
        }
        
        .reviews-summary {
            margin-bottom: 30px;
        }
        
        .average-rating {
            text-align: center;
        }
        
        .rating-number {
            font-size: 3rem;
            font-weight: 700;
            color: #00ff88;
        }
        
        .review {
            border: 1px solid #eee;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .reviewer-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .reviewer-avatar {
            width: 40px;
            height: 40px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn.enrolled {
            background: linear-gradient(135deg, #00cc6a, #00ff88);
            color: white;
        }
    `;
    document.head.appendChild(style);
}); 