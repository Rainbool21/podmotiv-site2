// MindMotivX JavaScript

class MindMotivX {
    constructor() {
        this.exercises = [
            {
                id: 1,
                name: "Утренняя медитация",
                duration: "10 минут",
                description: "Начни день с медитации для ясности ума",
                completed: false,
                icon: "🧘"
            },
            {
                id: 2,
                name: "Чтение мотивационной литературы",
                duration: "30 минут",
                description: "Погрузись в мир успешных людей",
                completed: false,
                icon: "📚"
            },
            {
                id: 3,
                name: "Запись 3 благодарностей",
                duration: "5 минут",
                description: "Запиши три вещи, за которые благодарен",
                completed: false,
                icon: "🙏"
            },
            {
                id: 4,
                name: "Планирование завтрашнего дня",
                duration: "10 минут",
                description: "Составь план на завтра",
                completed: false,
                icon: "📝"
            },
            {
                id: 5,
                name: "Физическая активность",
                duration: "30 минут",
                description: "Тренировка для тела и ума",
                completed: false,
                icon: "💪"
            }
        ];
        
        this.dailyChecklist = [
            "Проснулся до 6:00",
            "Выпил стакан воды",
            "Сделал утреннюю практику",
            "Прочитал 10 страниц",
            "Записал цели на день",
            "Выполнил физические упражнения",
            "Практиковал благодарность",
            "Планировал завтрашний день",
            "Лёг спать до 22:00"
        ];
        
        this.currentQuoteIndex = 0;
        this.quotes = [
            {
                text: "Успех — это не случайность. Это тяжелая работа, настойчивость, обучение, изучение, жертвоприношение и, прежде всего, любовь к тому, что вы делаете.",
                author: "Пеле"
            },
            {
                text: "Единственный способ делать великие дела — любить то, что вы делаете. Если вы еще не нашли это, продолжайте искать. Не останавливайтесь.",
                author: "Стив Джобс"
            },
            {
                text: "Будущее принадлежит тем, кто верит в красоту своей мечты.",
                author: "Элеонора Рузвельт"
            },
            {
                text: "Не бойтесь отказываться от хорошего ради великого.",
                author: "Джон Рокфеллер"
            },
            {
                text: "Дисциплина — это мост между целями и достижениями.",
                author: "Джим Рон"
            },
            {
                text: "Ваше время ограничено, не тратьте его, живя чужой жизнью.",
                author: "Стив Джобс"
            },
            {
                text: "Успех — это способность шаг за шагом идти от одной неудачи к другой, не теряя энтузиазма.",
                author: "Уинстон Черчилль"
            },
            {
                text: "Инвестируйте в себя. Ваш разум — это самое ценное, что у вас есть.",
                author: "Уоррен Баффет"
            }
        ];
        
        // Мобильные переменные
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.isPulling = false;
        this.pullDistance = 0;
        this.gestureStartX = 0;
        this.gestureStartY = 0;
        this.isGestureActive = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupNavigation();
        this.loadProgress();
        this.updateDate();
        this.renderExercises();
        this.renderChecklist();
        this.setupMotivationSlider();
        this.updateStats();
        
        // Мобильная инициализация
        if (this.isMobile) {
            this.mobileFeatures = new MobileFeatures(this);
        }
        
        // Инициализация мотивационных карточек
        setTimeout(() => {
            this.setupMotivationCards();
            this.setupCardFiltering();
        }, 100);
    }

    setupEventListeners() {
        // Кнопки в hero секции
        document.getElementById('start-practice').addEventListener('click', () => {
            document.getElementById('practice-section').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('view-exercises').addEventListener('click', () => {
            document.getElementById('exercises-section').scrollIntoView({ behavior: 'smooth' });
        });

        // Кнопка сохранения прогресса
        document.getElementById('save-progress').addEventListener('click', () => {
            this.saveProgress();
        });

        // Кнопки слайдера мотивации
        const prevQuoteBtn = document.getElementById('prev-quote');
        const nextQuoteBtn = document.getElementById('next-quote');
        
        if (prevQuoteBtn) {
            prevQuoteBtn.addEventListener('click', () => {
                this.prevQuote();
            });
        }
        
        if (nextQuoteBtn) {
            nextQuoteBtn.addEventListener('click', () => {
                this.nextQuote();
            });
        }
    }

    // ===== МОБИЛЬНЫЕ ФУНКЦИИ =====
    
    setupMobileFeatures() {
        this.setupPullToRefresh();
        this.setupGestureNavigation();
        this.setupMobileFab();
        this.setupBottomSheet();
        this.setupTouchEffects();
        this.setupMobileProgressRing();
        this.setupMobileAnimations();
        this.setupMobileConfetti();
        this.setupMobileSpotlight();
        this.setupMobileMagnetic();
        this.setupMobileVibration();
    }

    setupPullToRefresh() {
        const pullIndicator = document.getElementById('pull-indicator');
        
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        });

        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0) {
                const touchY = e.touches[0].clientY;
                const touchX = e.touches[0].clientX;
                const deltaY = touchY - this.touchStartY;
                const deltaX = Math.abs(touchX - this.touchStartX);
                
                // Проверяем, что это вертикальный свайп
                if (deltaY > 0 && deltaY > deltaX && deltaY > 50) {
                    this.isPulling = true;
                    this.pullDistance = Math.min(deltaY * 0.5, 100);
                    
                    if (pullIndicator) {
                        pullIndicator.style.transform = `translateX(-50%) translateY(${this.pullDistance}px)`;
                        pullIndicator.style.opacity = this.pullDistance / 100;
                    }
                }
            }
        });

        document.addEventListener('touchend', () => {
            if (this.isPulling && this.pullDistance > 80) {
                this.triggerPullToRefresh();
            }
            
            if (pullIndicator) {
                pullIndicator.style.transform = 'translateX(-50%) translateY(0px)';
                pullIndicator.style.opacity = 0;
            }
            
            this.isPulling = false;
            this.pullDistance = 0;
        });
    }

    triggerPullToRefresh() {
        const pullIndicator = document.getElementById('pull-indicator');
        if (pullIndicator) {
            pullIndicator.classList.add('active');
        }
        
        // Симулируем обновление данных
        setTimeout(() => {
            this.loadProgress();
            this.updateStats();
            this.showNotification('Данные обновлены!', 'success');
            
            if (pullIndicator) {
                pullIndicator.classList.remove('active');
            }
        }, 1500);
    }

    setupGestureNavigation() {
        const gestureArea = document.getElementById('gesture-area');
        
        if (!gestureArea) return;
        
        gestureArea.addEventListener('touchstart', (e) => {
            this.gestureStartX = e.touches[0].clientX;
            this.gestureStartY = e.touches[0].clientY;
            this.isGestureActive = true;
        });

        gestureArea.addEventListener('touchmove', (e) => {
            if (!this.isGestureActive) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - this.gestureStartX;
            const deltaY = Math.abs(touchY - this.gestureStartY);
            
            // Горизонтальный свайп вправо для открытия меню
            if (deltaX > 100 && deltaY < 50) {
                this.openMobileMenu();
                this.isGestureActive = false;
            }
        });

        gestureArea.addEventListener('touchend', () => {
            this.isGestureActive = false;
        });
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
        }
    }

    setupMobileFab() {
        const mobileFab = document.getElementById('mobile-fab');
        const bottomSheet = document.getElementById('mobile-bottom-sheet');
        
        if (mobileFab && bottomSheet) {
            mobileFab.addEventListener('click', () => {
                bottomSheet.classList.add('active');
                this.addMobileVibration();
            });
            
            // Закрытие bottom sheet при клике вне его
            bottomSheet.addEventListener('click', (e) => {
                if (e.target === bottomSheet) {
                    bottomSheet.classList.remove('active');
                }
            });
        }
    }

    setupBottomSheet() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        const bottomSheet = document.getElementById('mobile-bottom-sheet');
        
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
                bottomSheet.classList.remove('active');
                this.addMobileVibration();
            });
        });
    }

    handleQuickAction(action) {
        switch (action) {
            case 'meditation':
                this.showNotification('Запуск медитации...', 'info');
                setTimeout(() => {
                    document.getElementById('practice-section').scrollIntoView({ behavior: 'smooth' });
                }, 500);
                break;
            case 'reading':
                this.showNotification('Открытие библиотеки...', 'info');
                break;
            case 'exercise':
                this.showNotification('Запуск упражнений...', 'info');
                setTimeout(() => {
                    document.getElementById('exercises-section').scrollIntoView({ behavior: 'smooth' });
                }, 500);
                break;
            case 'planning':
                this.showNotification('Открытие планировщика...', 'info');
                break;
        }
    }

    setupTouchEffects() {
        // Touch ripple effect
        const touchRippleElements = document.querySelectorAll('.touch-ripple');
        
        touchRippleElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                element.style.setProperty('--ripple-x', x + 'px');
                element.style.setProperty('--ripple-y', y + 'px');
            });
        });

        // 3D tilt effect
        const tiltElements = document.querySelectorAll('.mobile-3d-tilt');
        
        tiltElements.forEach(element => {
            element.addEventListener('touchmove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 10;
                const rotateY = (centerX - x) / centerX * 10;
                
                element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupMobileProgressRing() {
        const progressRing = document.getElementById('progress-ring');
        if (progressRing) {
            const circumference = 2 * Math.PI * 35;
            progressRing.style.strokeDasharray = circumference;
            progressRing.style.strokeDashoffset = circumference;
        }
    }

    updateMobileProgress(percentage) {
        const progressRing = document.getElementById('progress-ring');
        const progressText = document.getElementById('completion-percentage');
        
        if (progressRing && progressText) {
            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (percentage / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
            progressText.textContent = `${percentage}%`;
        }
    }

    setupMobileAnimations() {
        // Добавляем анимации появления для мобильных элементов
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-slide-in');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.practice-card, .motivation-card, .method-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupMobileConfetti() {
        // Функция для создания конфетти
        this.createConfetti = () => {
            const confettiContainer = document.getElementById('mobile-confetti');
            if (!confettiContainer) return;
            
            confettiContainer.innerHTML = '';
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.background = [
                    'var(--accent-primary)',
                    'var(--accent-secondary)',
                    'var(--accent-tertiary)',
                    'var(--accent-purple)'
                ][Math.floor(Math.random() * 4)];
                
                confettiContainer.appendChild(confetti);
            }
            
            setTimeout(() => {
                confettiContainer.innerHTML = '';
            }, 3000);
        };
    }

    setupMobileSpotlight() {
        const spotlightElements = document.querySelectorAll('.mobile-spotlight');
        
        spotlightElements.forEach(element => {
            element.addEventListener('touchmove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                element.style.setProperty('--mouse-x', x + 'px');
                element.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }

    setupMobileMagnetic() {
        const magneticElements = document.querySelectorAll('.mobile-magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('touchmove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left - rect.width / 2;
                const y = e.touches[0].clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
                
                if (distance < maxDistance) {
                    const magneticX = (x / maxDistance) * 10;
                    const magneticY = (y / maxDistance) * 10;
                    
                    element.style.setProperty('--magnetic-x', magneticX + 'px');
                    element.style.setProperty('--magnetic-y', magneticY + 'px');
                    element.classList.add('magnetic');
                }
            });
            
            element.addEventListener('touchend', () => {
                element.classList.remove('magnetic');
            });
        });
    }

    setupMobileVibration() {
        // Симуляция вибрации через CSS анимацию
        this.addMobileVibration = () => {
            const elements = document.querySelectorAll('.btn, .practice-card, .motivation-card');
            elements.forEach(el => {
                el.classList.add('mobile-vibrate');
                setTimeout(() => {
                    el.classList.remove('mobile-vibrate');
                }, 100);
            });
        };
    }

    // ===== ОСНОВНЫЕ ФУНКЦИИ =====

    setupTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                const icon = themeToggle.querySelector('i');
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                
                // Добавляем вибрацию на мобильных
                if (this.isMobile) {
                    this.addMobileVibration();
                }
            });
            
            const icon = themeToggle.querySelector('i');
            icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Добавляем вибрацию на мобильных
                if (this.isMobile) {
                    this.addMobileVibration();
                }
            });
        }
    }

    updateDate() {
        const dateElement = document.getElementById('current-date');
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('ru-RU', options);
    }

    renderExercises() {
        const exercisesList = document.getElementById('exercises-list');
        exercisesList.innerHTML = '';

        this.exercises.forEach(exercise => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = `exercise-item ${exercise.completed ? 'completed' : ''}`;
            exerciseElement.innerHTML = `
                <div class="exercise-info">
                    <div class="exercise-icon">${exercise.icon}</div>
                    <div class="exercise-details">
                        <h4>${exercise.name}</h4>
                        <p>${exercise.description}</p>
                        <span class="exercise-duration">${exercise.duration}</span>
                    </div>
                </div>
                <div class="exercise-actions">
                    <button class="btn btn-outline btn-small complete-btn touch-ripple" data-id="${exercise.id}">
                        ${exercise.completed ? '<i class="fas fa-check"></i> Выполнено' : 'Отметить'}
                    </button>
                </div>
            `;
            
            exercisesList.appendChild(exerciseElement);
        });

        // Добавляем обработчики для кнопок
        const completeBtns = document.querySelectorAll('.complete-btn');
        completeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const exerciseId = parseInt(btn.dataset.id);
                this.toggleExercise(exerciseId);
                
                // Добавляем конфетти при выполнении
                if (this.isMobile && this.exercises.find(ex => ex.id === exerciseId)?.completed) {
                    this.createConfetti();
                }
            });
        });
    }

    toggleExercise(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
            exercise.completed = !exercise.completed;
            this.updateExerciseStats();
            this.renderExercises();
            
            // Добавляем вибрацию на мобильных
            if (this.isMobile) {
                this.addMobileVibration();
            }
        }
    }

    updateExerciseStats() {
        const completedCount = this.exercises.filter(ex => ex.completed).length;
        const totalCount = this.exercises.length;
        const percentage = Math.round((completedCount / totalCount) * 100);
        
        document.getElementById('completed-count').textContent = `${completedCount}/${totalCount}`;
        document.getElementById('completion-percentage').textContent = `${percentage}%`;
        
        // Обновляем мобильный прогресс-ринг
        if (this.isMobile) {
            this.updateMobileProgress(percentage);
        }
    }

    renderChecklist() {
        const checklist = document.getElementById('daily-checklist');
        checklist.innerHTML = '';

        this.dailyChecklist.forEach((item, index) => {
            const checklistItem = document.createElement('div');
            checklistItem.className = 'checklist-item';
            checklistItem.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" data-index="${index}">
                    <span class="checkmark"></span>
                    <span class="checklist-text">${item}</span>
                </label>
            `;
            
            checklist.appendChild(checklistItem);
        });

        // Добавляем обработчики для чекбоксов
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Добавляем вибрацию на мобильных
                if (this.isMobile) {
                    this.addMobileVibration();
                }
            });
        });
    }

    setupMotivationSlider() {
        // Создаем слайдер мотивации, если его нет
        const motivationSection = document.querySelector('.motivation-section');
        if (motivationSection && !document.getElementById('motivation-slider')) {
            const sliderHTML = `
                <div class="motivation-slider" id="motivation-slider">
                    <div class="slider-content">
                        <div class="quote-text" id="quote-text"></div>
                        <div class="quote-author" id="quote-author"></div>
                    </div>
                    <div class="slider-controls">
                        <button class="slider-btn" id="prev-quote">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="slider-dots" id="slider-dots"></div>
                        <button class="slider-btn" id="next-quote">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            `;
            
            motivationSection.querySelector('.container').insertAdjacentHTML('beforeend', sliderHTML);
            this.createDots();
            this.showQuote(0);
        }
    }

    showQuote(index) {
        const quote = this.quotes[index];
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        if (quoteText && quoteAuthor && quote) {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = `— ${quote.author}`;
            
            // Обновляем активную точку
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    createDots() {
        const dotsContainer = document.getElementById('slider-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            
            this.quotes.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    this.currentQuoteIndex = index;
                    this.showQuote(index);
                });
                dotsContainer.appendChild(dot);
            });
        }
    }

    prevQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex - 1 + this.quotes.length) % this.quotes.length;
        this.showQuote(this.currentQuoteIndex);
    }

    nextQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        this.showQuote(this.currentQuoteIndex);
    }

    updateStats() {
        const daysCompleted = this.getStreakDays();
        const tasksCompleted = this.exercises.filter(ex => ex.completed).length;
        const productivityScore = Math.round((tasksCompleted / this.exercises.length) * 100);
        
        document.getElementById('days-completed').textContent = daysCompleted;
        document.getElementById('tasks-completed').textContent = tasksCompleted;
        document.getElementById('productivity-score').textContent = `${productivityScore}%`;
    }

    getStreakDays() {
        const savedProgress = localStorage.getItem('mindmotivx_progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            return progress.streakDays || 0;
        }
        return 0;
    }

    saveProgress() {
        const progress = {
            exercises: this.exercises,
            date: new Date().toISOString(),
            streakDays: this.getStreakDays() + 1
        };
        
        localStorage.setItem('mindmotivx_progress', JSON.stringify(progress));
        this.showNotification('Прогресс сохранен!', 'success');
        
        // Добавляем конфетти при сохранении
        if (this.isMobile) {
            this.createConfetti();
        }
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('mindmotivx_progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            const savedDate = new Date(progress.date);
            const today = new Date();
            
            // Проверяем, что прогресс за сегодня
            if (savedDate.toDateString() === today.toDateString()) {
                this.exercises = progress.exercises || this.exercises;
            }
        }
    }

    showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Закрытие уведомления
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    setupMotivationCards() {
        const motivationCards = document.querySelectorAll('.motivation-card');
        
        motivationCards.forEach(card => {
            card.addEventListener('click', () => {
                const text = card.querySelector('p').textContent;
                const icon = card.querySelector('.card-icon').textContent;
                
                // Добавляем вибрацию на мобильных
                if (this.isMobile) {
                    this.addMobileVibration();
                }
                
                this.shareMotivationCard('Мотивация', text, 'mindmotivx');
            });
        });
    }

    shareMotivationCard(title, text, category) {
        if (navigator.share && this.isMobile) {
            navigator.share({
                title: title,
                text: text,
                url: window.location.href
            }).then(() => {
                this.showNotification('Поделились мотивацией!', 'success');
            }).catch(() => {
                this.copyToClipboard(text);
            });
        } else {
            this.copyToClipboard(text);
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Текст скопирован!', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Текст скопирован!', 'success');
        } catch (err) {
            this.showNotification('Не удалось скопировать текст', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    setupCardFiltering() {
        // Добавляем фильтрацию карточек, если нужно
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterCards(category);
                
                // Обновляем активную кнопку
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    filterCards(category) {
        const cards = document.querySelectorAll('.motivation-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.add('mobile-slide-in');
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new MindMotivX();
}); 