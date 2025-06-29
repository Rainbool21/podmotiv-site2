// LeaderX JavaScript

class LeaderXTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                question: "Как вы обычно принимаете решения в команде?",
                options: [
                    { text: "Принимаю решения самостоятельно, основываясь на своем опыте", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Собираю мнения команды, но принимаю финальное решение", score: { authoritarian: 2, democratic: 2, laissez: 1 } },
                    { text: "Провожу голосование и принимаю решение большинства", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде принимать решения самостоятельно", score: { authoritarian: 1, democratic: 1, laissez: 3 } }
                ]
            },
            {
                question: "Как вы мотивируете других людей?",
                options: [
                    { text: "Ставлю четкие цели и контролирую выполнение", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Объясняю важность задачи и поддерживаю энтузиазм", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Создаю комфортную атмосферу для творчества", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Использую систему поощрений и наказаний", score: { authoritarian: 3, democratic: 1, laissez: 1 } }
                ]
            },
            {
                question: "Как вы справляетесь с конфликтами в команде?",
                options: [
                    { text: "Принимаю решение и требую его выполнения", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Организую обсуждение и ищу компромисс", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде решить конфликт самостоятельно", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Избегаю конфликтов и перевожу разговор на другую тему", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы планируете долгосрочные цели?",
                options: [
                    { text: "Ставлю амбициозные цели и требую их достижения", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Обсуждаю цели с командой и корректирую планы", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде определять свои цели", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Ставлю минимальные цели, чтобы избежать стресса", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы относитесь к ошибкам подчиненных?",
                options: [
                    { text: "Строго наказываю за ошибки", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Анализирую ошибки вместе и ищем решения", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю учиться на своих ошибках", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Игнорирую мелкие ошибки", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы распределяете задачи в команде?",
                options: [
                    { text: "Даю четкие инструкции каждому", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Обсуждаю задачи и учитываю пожелания", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде самостоятельно распределять задачи", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Даю общие указания и не контролирую процесс", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы проводите встречи с командой?",
                options: [
                    { text: "Читаю лекции и даю указания", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Провожу интерактивные обсуждения", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Создаю пространство для свободного общения", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Минимизирую количество встреч", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы оцениваете результаты работы?",
                options: [
                    { text: "Сравниваю с жесткими стандартами", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Обсуждаю результаты и даю конструктивную обратную связь", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде самооцениваться", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Оцениваю только критические ошибки", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы развиваете навыки команды?",
                options: [
                    { text: "Требую обязательного обучения", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Предлагаю программы развития и поддерживаю инициативу", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде самостоятельно выбирать обучение", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Не вмешиваюсь в развитие команды", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            },
            {
                question: "Как вы создаете атмосферу в команде?",
                options: [
                    { text: "Поддерживаю строгую дисциплину", score: { authoritarian: 3, democratic: 1, laissez: 1 } },
                    { text: "Создаю позитивную и поддерживающую среду", score: { authoritarian: 1, democratic: 3, laissez: 1 } },
                    { text: "Позволяю команде формировать свою культуру", score: { authoritarian: 1, democratic: 1, laissez: 3 } },
                    { text: "Не обращаю внимания на атмосферу", score: { authoritarian: 1, democratic: 1, laissez: 2 } }
                ]
            }
        ];
        
        this.leaderTypes = {
            authoritarian: {
                name: "Авторитарный лидер",
                description: "Вы предпочитаете принимать решения самостоятельно и контролировать все процессы. Ваша сила в четкости и эффективности.",
                strengths: ["Быстрые решения", "Четкий контроль", "Высокая эффективность"],
                weaknesses: ["Низкая мотивация команды", "Творческий застой", "Высокая текучесть"],
                recommendations: [
                    "Учитесь делегировать полномочия",
                    "Развивайте эмпатию и слушание",
                    "Практикуйте демократические методы"
                ]
            },
            democratic: {
                name: "Демократический лидер",
                description: "Вы вовлекаете команду в принятие решений и создаете поддерживающую атмосферу. Ваша сила в мотивации и развитии.",
                strengths: ["Высокая мотивация команды", "Креативность", "Лояльность сотрудников"],
                weaknesses: ["Медленные решения", "Сложность в кризисных ситуациях", "Риск популизма"],
                recommendations: [
                    "Развивайте навыки быстрого принятия решений",
                    "Учитесь быть более решительным в кризисах",
                    "Балансируйте между демократией и эффективностью"
                ]
            },
            laissez: {
                name: "Либеральный лидер",
                description: "Вы даете команде максимальную свободу и автономность. Ваша сила в развитии инициативы и креативности.",
                strengths: ["Высокая инициативность", "Креативность", "Саморазвитие команды"],
                weaknesses: ["Отсутствие контроля", "Низкая эффективность", "Потеря направления"],
                recommendations: [
                    "Развивайте навыки контроля и координации",
                    "Учитесь ставить четкие цели",
                    "Практикуйте более активное руководство"
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Кнопки в hero секции
        document.getElementById('start-test').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('view-program').addEventListener('click', () => {
            document.getElementById('program-section').scrollIntoView({ behavior: 'smooth' });
        });

        // Навигация теста
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-question').addEventListener('click', () => {
            this.prevQuestion();
        });

        // Кнопки результатов
        document.getElementById('start-program').addEventListener('click', () => {
            window.open('https://t.me/PodMotivX', '_blank');
        });

        document.getElementById('retake-test').addEventListener('click', () => {
            this.resetTest();
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
            
            // Обновляем иконку
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

    startTest() {
        this.currentQuestion = 0;
        this.answers = [];
        document.getElementById('test-section').scrollIntoView({ behavior: 'smooth' });
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const testContent = document.getElementById('test-content');
        const progressText = document.getElementById('progress-text');
        const progressFill = document.getElementById('test-progress');
        
        // Обновляем прогресс
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Вопрос ${this.currentQuestion + 1} из ${this.questions.length}`;
        
        // Показываем/скрываем кнопку "Назад"
        const prevBtn = document.getElementById('prev-question');
        prevBtn.style.display = this.currentQuestion === 0 ? 'none' : 'inline-flex';
        
        // Обновляем текст кнопки "Далее"
        const nextBtn = document.getElementById('next-question');
        nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Завершить тест' : 'Далее';
        
        // Создаем HTML для вопроса
        testContent.innerHTML = `
            <div class="question-container">
                <h3 class="question-text">${question.question}</h3>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <label class="option-item ${this.answers[this.currentQuestion] === index ? 'selected' : ''}">
                            <input type="radio" name="question-${this.currentQuestion}" value="${index}" 
                                   ${this.answers[this.currentQuestion] === index ? 'checked' : ''}>
                            <span class="option-text">${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Добавляем обработчики для опций
        testContent.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
            radio.addEventListener('change', () => {
                this.answers[this.currentQuestion] = index;
                testContent.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
                radio.closest('.option-item').classList.add('selected');
            });
        });
    }

    nextQuestion() {
        if (this.answers[this.currentQuestion] === undefined) {
            alert('Пожалуйста, выберите ответ на вопрос');
            return;
        }
        
        if (this.currentQuestion === this.questions.length - 1) {
            this.finishTest();
        } else {
            this.currentQuestion++;
            this.showQuestion();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    finishTest() {
        const results = this.calculateResults();
        this.showResults(results);
    }

    calculateResults() {
        const scores = { authoritarian: 0, democratic: 0, laissez: 0 };
        
        this.answers.forEach((answer, questionIndex) => {
            const question = this.questions[questionIndex];
            const selectedOption = question.options[answer];
            
            scores.authoritarian += selectedOption.score.authoritarian;
            scores.democratic += selectedOption.score.democratic;
            scores.laissez += selectedOption.score.laissez;
        });
        
        // Определяем доминирующий тип
        const maxScore = Math.max(scores.authoritarian, scores.democratic, scores.laissez);
        let dominantType = 'democratic';
        
        if (scores.authoritarian === maxScore) dominantType = 'authoritarian';
        else if (scores.democratic === maxScore) dominantType = 'democratic';
        else if (scores.laissez === maxScore) dominantType = 'laissez';
        
        return {
            scores,
            dominantType,
            leaderType: this.leaderTypes[dominantType]
        };
    }

    showResults(results) {
        const resultsSection = document.getElementById('results-section');
        const resultsContent = document.getElementById('results-content');
        
        resultsContent.innerHTML = `
            <div class="results-card">
                <div class="result-header">
                    <h3>${results.leaderType.name}</h3>
                    <p>${results.leaderType.description}</p>
                </div>
                
                <div class="result-scores">
                    <h4>Ваши результаты:</h4>
                    <div class="score-bars">
                        <div class="score-bar">
                            <span>Авторитарный: ${results.scores.authoritarian}</span>
                            <div class="bar">
                                <div class="bar-fill" style="width: ${(results.scores.authoritarian / 30) * 100}%"></div>
                            </div>
                        </div>
                        <div class="score-bar">
                            <span>Демократический: ${results.scores.democratic}</span>
                            <div class="bar">
                                <div class="bar-fill" style="width: ${(results.scores.democratic / 30) * 100}%"></div>
                            </div>
                        </div>
                        <div class="score-bar">
                            <span>Либеральный: ${results.scores.laissez}</span>
                            <div class="bar">
                                <div class="bar-fill" style="width: ${(results.scores.laissez / 30) * 100}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="result-details">
                    <div class="strengths">
                        <h4>Ваши сильные стороны:</h4>
                        <ul>
                            ${results.leaderType.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="weaknesses">
                        <h4>Области для развития:</h4>
                        <ul>
                            ${results.leaderType.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="recommendations">
                        <h4>Рекомендации для развития:</h4>
                        <ul>
                            ${results.leaderType.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    resetTest() {
        this.currentQuestion = 0;
        this.answers = [];
        document.getElementById('results-section').style.display = 'none';
        this.showQuestion();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new LeaderXTest();
});

// Добавляем стили для теста
const testStyles = `
<style>
.leaderx-hero {
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
}

.hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    margin-bottom: 1rem;
    backdrop-filter: blur(10px);
}

.hero-badge span {
    color: white;
    font-weight: 600;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.leader-visual {
    text-align: center;
}

.leader-avatar {
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    backdrop-filter: blur(10px);
}

.leader-avatar i {
    font-size: 3rem;
    color: white;
}

.test-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
}

.test-header {
    text-align: center;
    margin-bottom: 3rem;
}

.test-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.test-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.test-container {
    max-width: 800px;
    margin: 0 auto;
    background: var(--bg-primary);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: var(--shadow-lg);
}

.test-progress {
    margin-bottom: 2rem;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
}

#progress-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.question-container {
    margin-bottom: 2rem;
}

.question-text {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
    line-height: 1.5;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.option-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--bg-secondary);
}

.option-item:hover {
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
}

.option-item.selected {
    border-color: var(--accent-primary);
    background: var(--accent-primary);
    color: white;
}

.option-item input[type="radio"] {
    margin-right: 1rem;
    transform: scale(1.2);
}

.option-text {
    flex: 1;
    font-weight: 500;
}

.test-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.program-section {
    padding: 5rem 0;
}

.program-header {
    text-align: center;
    margin-bottom: 4rem;
}

.program-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.program-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.program-timeline {
    max-width: 800px;
    margin: 0 auto;
}

.timeline-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 3rem;
    position: relative;
}

.timeline-item:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 30px;
    top: 60px;
    bottom: -30px;
    width: 2px;
    background: var(--border-color);
}

.timeline-marker {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 2rem;
    flex-shrink: 0;
}

.timeline-content {
    flex: 1;
}

.timeline-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.timeline-content p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.timeline-content ul {
    list-style: none;
    padding: 0;
}

.timeline-content li {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: 1.5rem;
}

.timeline-content li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
    font-weight: bold;
}

.modules-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
}

.modules-header {
    text-align: center;
    margin-bottom: 4rem;
}

.modules-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.modules-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.module-card {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}

.module-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
}

.module-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.module-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.module-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.module-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.topic {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.module-duration {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 500;
}

.results-section {
    padding: 5rem 0;
    background: var(--bg-secondary);
}

.results-header {
    text-align: center;
    margin-bottom: 3rem;
}

.results-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.results-header p {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.results-card {
    max-width: 800px;
    margin: 0 auto;
    background: var(--bg-primary);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: var(--shadow-lg);
}

.result-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.result-header h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.result-header p {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

.result-scores {
    margin-bottom: 2rem;
}

.result-scores h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.score-bars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.score-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.score-bar span {
    min-width: 150px;
    color: var(--text-secondary);
    font-weight: 500;
}

.bar {
    flex: 1;
    height: 8px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
}

.bar-fill {
    height: 100%;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
}

.result-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.strengths, .weaknesses, .recommendations {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 1.5rem;
}

.strengths h4, .weaknesses h4, .recommendations h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.strengths ul, .weaknesses ul, .recommendations ul {
    list-style: none;
    padding: 0;
}

.strengths li, .weaknesses li, .recommendations li {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    position: relative;
    padding-left: 1.5rem;
}

.strengths li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
    font-weight: bold;
}

.weaknesses li::before {
    content: '⚠';
    position: absolute;
    left: 0;
    color: var(--accent-secondary);
    font-weight: bold;
}

.recommendations li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-tertiary);
    font-weight: bold;
}

.results-actions {
    text-align: center;
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .test-container {
        padding: 2rem;
    }
    
    .timeline-item {
        flex-direction: column;
        text-align: center;
    }
    
    .timeline-marker {
        margin-right: 0;
        margin-bottom: 1rem;
    }
    
    .timeline-item:not(:last-child)::after {
        display: none;
    }
    
    .result-details {
        grid-template-columns: 1fr;
    }
    
    .results-actions {
        flex-direction: column;
        align-items: center;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', testStyles); 