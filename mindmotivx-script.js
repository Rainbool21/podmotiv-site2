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
        document.getElementById('prev-quote').addEventListener('click', () => {
            this.prevQuote();
        });

        document.getElementById('next-quote').addEventListener('click', () => {
            this.nextQuote();
        });
    }

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
                    <button class="btn btn-outline btn-small complete-btn" data-id="${exercise.id}">
                        ${exercise.completed ? '<i class="fas fa-check"></i> Выполнено' : 'Отметить'}
                    </button>
                </div>
            `;

            exercisesList.appendChild(exerciseElement);

            // Добавляем обработчик для кнопки
            const completeBtn = exerciseElement.querySelector('.complete-btn');
            completeBtn.addEventListener('click', () => {
                this.toggleExercise(exercise.id);
            });
        });

        this.updateExerciseStats();
    }

    toggleExercise(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
            exercise.completed = !exercise.completed;
            this.renderExercises();
            this.saveProgress();
        }
    }

    updateExerciseStats() {
        const completedCount = this.exercises.filter(ex => ex.completed).length;
        const percentage = Math.round((completedCount / this.exercises.length) * 100);

        document.getElementById('completed-count').textContent = `${completedCount}/${this.exercises.length}`;
        document.getElementById('completion-percentage').textContent = `${percentage}%`;
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

            // Добавляем обработчик
            const checkbox = checklistItem.querySelector('input');
            checkbox.addEventListener('change', () => {
                this.updateStats();
            });
        });
    }

    setupMotivationSlider() {
        this.showQuote(0);
        this.createDots();

        // Автоматическое переключение каждые 5 секунд
        setInterval(() => {
            this.nextQuote();
        }, 5000);
    }

    showQuote(index) {
        const cards = document.querySelectorAll('.motivation-card');
        const dots = document.querySelectorAll('.slider-dot');

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentQuoteIndex = index;
    }

    createDots() {
        const dotsContainer = document.getElementById('slider-dots');
        dotsContainer.innerHTML = '';

        this.quotes.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                this.showQuote(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    prevQuote() {
        const newIndex = this.currentQuoteIndex === 0 ? this.quotes.length - 1 : this.currentQuoteIndex - 1;
        this.showQuote(newIndex);
    }

    nextQuote() {
        const newIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        this.showQuote(newIndex);
    }

    updateStats() {
        const checkboxes = document.querySelectorAll('#daily-checklist input[type="checkbox"]');
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        const productivityScore = Math.round((completedTasks / totalTasks) * 100);

        // Обновляем статистику
        document.getElementById('days-completed').textContent = this.getStreakDays();
        document.getElementById('tasks-completed').textContent = completedTasks;
        document.getElementById('productivity-score').textContent = `${productivityScore}%`;
    }

    getStreakDays() {
        // Простая логика для демонстрации
        const savedStreak = localStorage.getItem('mindmotivx_streak') || 0;
        return parseInt(savedStreak);
    }

    saveProgress() {
        // Сохраняем прогресс упражнений
        localStorage.setItem('mindmotivx_exercises', JSON.stringify(this.exercises));
        
        // Сохраняем чек-лист
        const checkboxes = document.querySelectorAll('#daily-checklist input[type="checkbox"]');
        const checklistProgress = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem('mindmotivx_checklist', JSON.stringify(checklistProgress));
        
        // Показываем уведомление
        this.showNotification('Прогресс сохранен!', 'success');
    }

    loadProgress() {
        // Загружаем прогресс упражнений
        const savedExercises = localStorage.getItem('mindmotivx_exercises');
        if (savedExercises) {
            this.exercises = JSON.parse(savedExercises);
        }

        // Загружаем чек-лист
        const savedChecklist = localStorage.getItem('mindmotivx_checklist');
        if (savedChecklist) {
            const checklistProgress = JSON.parse(savedChecklist);
            setTimeout(() => {
                const checkboxes = document.querySelectorAll('#daily-checklist input[type="checkbox"]');
                checkboxes.forEach((cb, index) => {
                    if (checklistProgress[index]) {
                        cb.checked = true;
                    }
                });
                this.updateStats();
            }, 100);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Функциональность для мотивационных карточек
    setupMotivationCards() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.motivation-card');
                const title = card.querySelector('h3').textContent;
                const text = card.querySelector('p').textContent;
                const category = card.querySelector('.category').textContent;
                
                this.shareMotivationCard(title, text, category);
            });
        });

        // Добавляем анимации при наведении на карточки
        const cards = document.querySelectorAll('.motivation-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    shareMotivationCard(title, text, category) {
        const shareText = `${title}\n\n${text}\n\n#${category} #PodMotivX #Мотивация`;
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: window.location.href
            }).then(() => {
                this.showNotification('Карточка успешно поделена!', 'success');
            }).catch(() => {
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Текст скопирован в буфер обмена!', 'success');
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
            this.showNotification('Текст скопирован в буфер обмена!', 'success');
        } catch (err) {
            this.showNotification('Не удалось скопировать текст', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // Фильтрация карточек по категориям
    setupCardFiltering() {
        const categories = ['all', 'success', 'mindset', 'action', 'persistence', 'growth', 'vision', 'courage', 'focus', 'belief', 'discipline', 'innovation', 'leadership', 'resilience', 'excellence', 'gratitude', 'purpose', 'abundance', 'wisdom', 'passion', 'transformation', 'legacy', 'universe', 'power', 'destiny', 'miracle', 'eternity', 'genius', 'mastery', 'evolution', 'revolution', 'immortality', 'superhuman', 'quantum', 'multiverse', 'time-travel', 'telepathy', 'levitation', 'invisibility', 'shape-shifting', 'phoenix', 'dragon', 'unicorn', 'wizard', 'alchemy', 'oracle', 'cosmos', 'galaxy', 'black-hole', 'supernova', 'nebula', 'constellation', 'meteor', 'aurora', 'infinity'];
        
        // Создаем кнопки фильтрации
        const filterContainer = document.createElement('div');
        filterContainer.className = 'motivation-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-category="all">Все</button>
                <button class="filter-btn" data-category="success">Успех</button>
                <button class="filter-btn" data-category="mindset">Мышление</button>
                <button class="filter-btn" data-category="action">Действие</button>
                <button class="filter-btn" data-category="growth">Рост</button>
                <button class="filter-btn" data-category="cosmos">Космос</button>
                <button class="filter-btn" data-category="magic">Магия</button>
            </div>
        `;
        
        const motivationHeader = document.querySelector('.motivation-header');
        if (motivationHeader) {
            motivationHeader.appendChild(filterContainer);
        }
        
        // Добавляем обработчики событий
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterCards(category);
                
                // Обновляем активную кнопку
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterCards(category) {
        const cards = document.querySelectorAll('.motivation-card');
        
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new MindMotivX();
});

// Добавляем стили для MindMotivX
const mindmotivxStyles = `
<style>
.mindmotivx-hero {
    background: linear-gradient(135deg, #ff8800 0%, #ff6600 100%);
}

.mind-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
}

.mind-orb {
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    animation: pulse 2s ease-in-out infinite;
}

.mind-orb i {
    font-size: 4rem;
    color: white;
}

.mind-particles {
    position: absolute;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
}

.particle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.particle:nth-child(2) { top: 30%; right: 25%; animation-delay: 0.5s; }
.particle:nth-child(3) { bottom: 30%; left: 30%; animation-delay: 1s; }
.particle:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 1.5s; }
.particle:nth-child(5) { top: 50%; left: 50%; animation-delay: 2s; }

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

.practice-section {
    padding: 5rem 0;
}

.practice-header {
    text-align: center;
    margin-bottom: 4rem;
}

.practice-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.practice-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.practice-card {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}

.practice-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-secondary);
}

.practice-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.practice-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.practice-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.practice-content {
    margin-bottom: 1.5rem;
}

.setup-item, .technique-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
}

.setup-item:last-child, .technique-item:last-child {
    border-bottom: none;
}

.setup-item i {
    color: var(--accent-secondary);
    font-size: 1.2rem;
}

.setup-item span, .technique-item span {
    color: var(--text-primary);
    font-weight: 500;
}

.technique-duration {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 0.9rem;
}

.belief-item {
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.belief-old {
    display: block;
    color: var(--text-muted);
    text-decoration: line-through;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.belief-new {
    display: block;
    color: var(--accent-secondary);
    font-weight: 600;
}

.exercises-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
}

.exercises-header {
    text-align: center;
    margin-bottom: 4rem;
}

.exercises-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.exercises-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.exercises-container {
    max-width: 800px;
    margin: 0 auto;
}

.exercise-tracker {
    background: var(--bg-primary);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-lg);
}

.tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.tracker-header h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
}

.date {
    color: var(--text-secondary);
    font-weight: 500;
}

.exercises-list {
    margin-bottom: 2rem;
}

.exercise-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.exercise-item.completed {
    background: var(--accent-secondary);
    color: white;
}

.exercise-item.completed .exercise-details h4,
.exercise-item.completed .exercise-details p,
.exercise-item.completed .exercise-duration {
    color: white;
}

.exercise-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.exercise-icon {
    font-size: 2rem;
}

.exercise-details h4 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.exercise-details p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.exercise-duration {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 500;
}

.exercise-actions {
    flex-shrink: 0;
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
}

.tracker-summary {
    display: flex;
    justify-content: space-around;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.summary-item {
    text-align: center;
}

.summary-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.summary-value {
    display: block;
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: bold;
}

.motivation-section {
    padding: 5rem 0;
}

.motivation-header {
    text-align: center;
    margin-bottom: 4rem;
}

.motivation-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.motivation-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.motivation-slider {
    max-width: 800px;
    margin: 0 auto;
}

.slider-container {
    position: relative;
    height: 300px;
    overflow: hidden;
}

.motivation-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease;
}

.motivation-card.active {
    opacity: 1;
    transform: translateX(0);
}

.card-quote {
    margin-bottom: 2rem;
}

.card-quote i {
    color: var(--accent-secondary);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.card-quote p {
    font-size: 1.3rem;
    line-height: 1.6;
    color: var(--text-primary);
    font-style: italic;
}

.card-author {
    color: var(--text-secondary);
    font-weight: 600;
}

.slider-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
}

.slider-btn {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    color: var(--text-secondary);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-btn:hover {
    border-color: var(--accent-secondary);
    color: var(--accent-secondary);
}

.slider-dots {
    display: flex;
    gap: 0.5rem;
}

.slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--border-color);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-dot.active {
    background: var(--accent-secondary);
}

.timemanagement-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
}

.timemanagement-header {
    text-align: center;
    margin-bottom: 4rem;
}

.timemanagement-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.timemanagement-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.timemanagement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.method-card {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}

.method-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.method-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.method-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.method-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.method-quadrants {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.quadrant {
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
}

.q1 {
    background: #ff6b6b;
    color: white;
}

.q2 {
    background: #4ecdc4;
    color: white;
}

.q3 {
    background: #ffe66d;
    color: #333;
}

.q4 {
    background: #95a5a6;
    color: white;
}

.quadrant-title {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.quadrant-desc {
    display: block;
    font-size: 0.8rem;
}

.chart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.chart-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.chart-bar span {
    min-width: 120px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.bar-fill {
    flex: 1;
    height: 20px;
    border-radius: 10px;
    background: var(--gradient-primary);
}

.bar-20 .bar-fill {
    width: 20%;
}

.bar-80 .bar-fill {
    width: 80%;
}

.time-blocks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.time-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
}

.time {
    color: var(--accent-tertiary);
    font-weight: bold;
}

.activity {
    color: var(--text-primary);
    font-weight: 500;
}

.progress-section {
    padding: 5rem 0;
}

.progress-header {
    text-align: center;
    margin-bottom: 4rem;
}

.progress-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.progress-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.progress-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.progress-card {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-md);
}

.progress-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

.checklist {
    margin-bottom: 1.5rem;
}

.checklist-item {
    margin-bottom: 1rem;
}

.checkbox-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.checkbox-container:hover {
    background: var(--bg-secondary);
}

.checkbox-container input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
}

.checkbox-container input[type="checkbox"]:checked + .checkmark {
    background: var(--accent-secondary);
    border-color: var(--accent-secondary);
}

.checkbox-container input[type="checkbox"]:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

.checklist-text {
    color: var(--text-primary);
    font-weight: 500;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 12px;
}

.stat-icon {
    font-size: 1.5rem;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-primary);
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow-lg);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.notification-success {
    border-color: var(--accent-primary);
}

.notification-success i {
    color: var(--accent-primary);
}

@media (max-width: 768px) {
    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .practice-grid,
    .timemanagement-grid,
    .progress-container {
        grid-template-columns: 1fr;
    }
    
    .method-quadrants {
        grid-template-columns: 1fr;
    }
    
    .exercise-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .exercise-actions {
        align-self: stretch;
    }
    
    .exercise-actions .btn {
        width: 100%;
    }
    
    .motivation-card {
        padding: 2rem;
    }
    
    .card-quote p {
        font-size: 1.1rem;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.motivation-filters {
    margin-top: 2rem;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 0.9rem;
}

.filter-btn:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-2px);
}

.filter-btn.active {
    background: var(--gradient-primary);
    border-color: var(--accent-primary);
    color: white;
}

@media (max-width: 768px) {
    .filter-buttons {
        gap: 0.5rem;
    }
    
    .filter-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', mindmotivxStyles); 