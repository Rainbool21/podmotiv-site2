// Мобильные функции для MindMotivX

class MobileFeatures {
    constructor(mindMotivX) {
        this.app = mindMotivX;
        this.isMobile = window.innerWidth <= 768;
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.isPulling = false;
        this.pullDistance = 0;
        this.gestureStartX = 0;
        this.gestureStartY = 0;
        this.isGestureActive = false;
        
        if (this.isMobile) {
            this.init();
        }
    }

    init() {
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
            this.app.loadProgress();
            this.app.updateStats();
            this.app.showNotification('Данные обновлены!', 'success');
            
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
                this.app.showNotification('Запуск медитации...', 'info');
                setTimeout(() => {
                    document.getElementById('practice-section').scrollIntoView({ behavior: 'smooth' });
                }, 500);
                break;
            case 'reading':
                this.app.showNotification('Открытие библиотеки...', 'info');
                break;
            case 'exercise':
                this.app.showNotification('Запуск упражнений...', 'info');
                setTimeout(() => {
                    document.getElementById('exercises-section').scrollIntoView({ behavior: 'smooth' });
                }, 500);
                break;
            case 'planning':
                this.app.showNotification('Открытие планировщика...', 'info');
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
}

// Экспорт для использования в основном файле
window.MobileFeatures = MobileFeatures; 