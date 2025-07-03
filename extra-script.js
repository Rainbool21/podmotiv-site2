// extra-script.js

// --- ДАННЫЕ ДЛЯ АНКЕТЫ (УЛУЧШЕННЫЙ ВАРИАНТ) ---
const questions = [
  { label: 'Ваш возраст', type: 'select', name: 'age', options: ['до 18', '18-24', '25-34', '35-44', '45-54', '55+'], required: true },
  { label: 'Ваш пол', type: 'select', name: 'gender', options: ['Мужской', 'Женский', 'Другое'], required: true },
  { label: 'Где вы живёте?', type: 'select', name: 'region', options: ['Россия', 'Казахстан', 'Украина', 'Беларусь', 'Другое'], required: true },
  { label: 'Ваш уровень образования', type: 'select', name: 'education', options: ['Школа', 'Колледж', 'Бакалавр', 'Магистр', 'Доктор', 'Самоучка'], required: true },
  { label: 'Ваш опыт в бизнесе', type: 'select', name: 'bizexp', options: ['Нет', 'Маленький (до 1 года)', 'Средний (1-3 года)', 'Большой (3+ лет)'], required: true },
  { label: 'Сколько свободного времени в день вы готовы уделять?', type: 'select', name: 'freeTime', options: ['<1 часа', '1-2 часа', '2-4 часа', '4+ часов'], required: true },
  { label: 'Ваш стартовый капитал (USD)', type: 'select', name: 'capital', options: ['0', '1-100', '100-1000', '1000-5000', '5000+'], required: true },
  { label: 'Ваша главная цель?', type: 'select', name: 'goal', options: ['Заработать деньги', 'Стать богатым', 'Сделать что-то полезное', 'Изменить мир', 'Самореализация', 'Другое'], required: true },
  { label: 'Ваши интересы (можно выбрать несколько)', type: 'checkbox', name: 'interests', options: ['Технологии', 'Спорт', 'Образование', 'Мода', 'Путешествия', 'ЗОЖ', 'Искусство', 'Бизнес', 'Финансы', 'Другое'], required: true },
  { label: 'Ваши ключевые навыки', type: 'checkbox', name: 'skills', options: ['Технические', 'Коммуникативные', 'Творческие', 'Продажи', 'Маркетинг', 'Аналитика', 'Дизайн', 'Управление', 'Другое'], required: true },
  { label: 'Ваши сильные стороны', type: 'checkbox', name: 'strengths', options: ['Креативность', 'Упорство', 'Лидерство', 'Стратегия', 'Аналитика', 'Общение', 'Обучаемость', 'Организованность', 'Другое'], required: true },
  { label: 'Какие форматы вам ближе?', type: 'checkbox', name: 'formats', options: ['Онлайн', 'Оффлайн', 'Сервисы', 'Товары', 'Образование', 'Медиа', 'Консалтинг', 'Другое'], required: true },
  { label: 'Готовы ли вы работать в команде?', type: 'select', name: 'team', options: ['Да', 'Нет', 'Не знаю'], required: true },
  { label: 'Ваш тип мышления', type: 'select', name: 'mindtype', options: ['Лидер', 'Стратег', 'Аналитик', 'Творец', 'Исполнитель', 'Коммуникатор'], required: true },
  { label: 'Ваша главная проблема или боль', type: 'text', name: 'problem', placeholder: 'Что мешает вам или что хотите решить?', required: true },
  { label: 'Готовы ли вы рисковать?', type: 'select', name: 'risk', options: ['Да', 'Нет', 'В меру'], required: true },
  { label: 'Какой доход вас устроит на старте?', type: 'select', name: 'income', options: ['<100$', '100-500$', '500-2000$', '2000$+'], required: true },
  { label: 'Выберите, что для вас важнее', type: 'select', name: 'priority', options: ['Стабильность', 'Рост', 'Свобода', 'Влияние', 'Творчество'], required: true },
  { label: 'Опишите себя в 2-3 словах', type: 'text', name: 'about', placeholder: 'Например: энергичный, любознательный', required: true },
];

// --- СОСТОЯНИЕ ---
let currentStep = 0;
let answers = {};

// --- DOM ---
const stepper = document.getElementById('stepper');
const form = document.getElementById('idea-form');
const ideasOutput = document.getElementById('ideas-output');
const mentorBubble = document.getElementById('mentor-bubble');

// --- АНКЕТА ---
function renderStepper() {
  // Прогресс-бар
  stepper.innerHTML = '';
  const progress = document.createElement('div');
  progress.style.height = '8px';
  progress.style.background = 'var(--bg-tertiary)';
  progress.style.borderRadius = '6px';
  progress.style.overflow = 'hidden';
  progress.style.marginBottom = '1.2rem';
  progress.innerHTML = `<div style="height:100%;background:var(--gradient-primary);width:${Math.round((currentStep+1)/questions.length*100)}%;transition:width 0.4s;"></div>`;
  stepper.appendChild(progress);
  // Кружки шагов
  const steps = document.createElement('div');
  steps.style.display = 'flex';
  steps.style.gap = '0.3rem';
  steps.style.marginTop = '0.5rem';
  for (let i = 0; i < questions.length; i++) {
    const step = document.createElement('div');
    step.className = 'step' + (i === currentStep ? ' active' : i < currentStep ? ' done' : '');
    step.textContent = i + 1;
    steps.appendChild(step);
  }
  stepper.appendChild(steps);
}

function renderQuestion() {
  const q = questions[currentStep];
  form.innerHTML = '';
  const label = document.createElement('label');
  label.className = 'question-label';
  label.textContent = q.label;
  form.appendChild(label);

  let input;
  if (q.type === 'select') {
    input = document.createElement('select');
    input.className = 'input';
    input.name = q.name;
    q.options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      input.appendChild(option);
    });
    if (answers[q.name]) input.value = answers[q.name];
  } else if (q.type === 'checkbox') {
    input = document.createElement('div');
    input.style.display = 'flex';
    input.style.flexWrap = 'wrap';
    input.style.gap = '0.7rem';
    q.options.forEach(opt => {
      const id = q.name + '_' + opt;
      const label = document.createElement('label');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '0.3rem';
      label.style.background = 'var(--bg-tertiary)';
      label.style.borderRadius = '8px';
      label.style.padding = '0.4rem 0.8rem';
      label.style.cursor = 'pointer';
      label.style.fontWeight = '500';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = q.name;
      checkbox.value = opt;
      checkbox.id = id;
      if (answers[q.name] && answers[q.name].includes(opt)) checkbox.checked = true;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(opt));
      input.appendChild(label);
    });
  } else if (q.type === 'number') {
    input = document.createElement('input');
    input.type = 'number';
    input.className = 'input';
    input.name = q.name;
    input.placeholder = q.placeholder || '';
    if (q.min !== undefined) input.min = q.min;
    if (q.max !== undefined) input.max = q.max;
    if (answers[q.name]) input.value = answers[q.name];
  } else {
    input = document.createElement('input');
    input.type = 'text';
    input.className = 'input';
    input.name = q.name;
    input.placeholder = q.placeholder || '';
    if (answers[q.name]) input.value = answers[q.name];
  }
  form.appendChild(input);

  // Кнопки
  const btns = document.createElement('div');
  btns.style.display = 'flex';
  btns.style.justifyContent = 'space-between';
  if (currentStep > 0) {
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'btn-main';
    prev.textContent = 'Назад';
    prev.onclick = () => { currentStep--; renderAll(); };
    btns.appendChild(prev);
  }
  const next = document.createElement('button');
  next.type = 'submit';
  next.className = 'btn-main';
  next.textContent = currentStep === questions.length - 1 ? 'Генерировать идеи' : 'Далее';
  btns.appendChild(next);
  form.appendChild(btns);

  // Ментор-подсказка
  mentorSay(mentorTips[currentStep] || 'Заполни анкету честно — и получишь лучшие идеи!');
}

form.onsubmit = (e) => {
  e.preventDefault();
  const q = questions[currentStep];
  let value;
  if (q.type === 'checkbox') {
    value = Array.from(form.querySelectorAll('input[name="' + q.name + '"]:checked')).map(cb => cb.value);
    if (q.required && value.length === 0) {
      mentorSay('Пожалуйста, выберите хотя бы один вариант!');
      return;
    }
  } else {
    value = form.elements[q.name].value;
    if (q.required && !value) {
      mentorSay('Пожалуйста, ответьте на вопрос!');
      return;
    }
  }
  answers[q.name] = value;
  if (currentStep < questions.length - 1) {
    currentStep++;
    renderAll();
  } else {
    // Генерировать идеи
    form.style.display = 'none';
    stepper.style.display = 'none';
    mentorSay('Анализирую твои ответы и подбираю лучшие бизнес-идеи...');
    setTimeout(() => {
      showIdeas(generateIdeas(answers));
      mentorSay('Вот твои индивидуальные бизнес-идеи и план запуска!');
    }, 1800);
  }
};

function renderAll() {
  renderStepper();
  renderQuestion();
}

// --- МЕНТОР ---
const mentorTips = [
  'Возраст влияет на выбор ниши и подхода.',
  'Пол может влиять на стиль бизнеса.',
  'Регион — это тренды и возможности.',
  'Образование — твой фундамент.',
  'Опыт — важен для выбора масштаба.',
  'Время — твой главный ресурс.',
  'Капитал — определяет старт.',
  'Цель — определяет стратегию.',
  'Интересы — источник энергии.',
  'Навыки — твой инструмент.',
  'Сильные стороны — твой фундамент.',
  'Формат — влияет на модель бизнеса.',
  'Команда или соло? Это важно для стратегии.',
  'Тип мышления — определяет стиль решений.',
  'Проблема — источник идей.',
  'Риск — определяет скорость роста.',
  'Доход — твой ориентир.',
  'Приоритет — влияет на выбор модели.',
  'Опиши себя честно — это важно!',
];
function mentorSay(text) {
  mentorBubble.textContent = text;
}

/**
 * Модуль генерации бизнес-идей с глубоким анализом текста
 * и продвинутыми техниками (AI-режим).
 * Вход: текст пользователя (интересы, опыт, цели).
 * Выход: массив детальных бизнес-идей.
 */
const BusinessIdeaGenerator = (() => {
  // --- Утилиты ---
  function preprocessText(text) {
    const stopWords = new Set([
      "и", "в", "во", "не", "что", "он", "на", "я", "с", "со", "как", "а",
      "то", "все", "она", "так", "его", "но", "да", "ты", "к", "у", "же",
      "вы", "за", "бы", "по", "ее", "мне", "было", "вот", "от", "меня",
      "еще", "нет", "о", "из", "ему", "теперь", "когда", "даже", "ну",
      "вдруг", "ли", "если", "уже", "или", "ни", "быть", "был", "него",
      "до", "вас", "нибудь", "опять", "уж", "вам", "ведь", "там", "потом",
      "себя", "ничего", "ей", "может", "они", "тут", "где", "есть", "надо",
      "ней", "для", "мы", "тебя", "их", "чем", "была", "сам", "чтоб",
      "без", "будто", "человек", "чего", "раз", "тоже", "себе", "под",
      "будет", "ж", "тогда", "кто", "этот", "того", "потому", "этого",
      "какой", "совсем", "ним", "здесь", "этом", "один", "почти",
      "мой", "тем", "чтобы", "нее", "сейчас", "были", "куда", "зачем",
      "всех", "никогда", "можно", "при", "наконец", "два", "об", "другой",
      "хоть", "после", "над", "больше", "тот", "через", "эти", "нас",
      "про", "всего", "них", "какая", "много", "разве", "три", "эту",
      "моя", "впрочем", "хорошо", "свою", "этой", "перед", "иногда",
      "лучше", "чуть", "том", "нельзя", "такой", "им", "более", "всегда",
      "конечно", "всю", "между"
    ]);
    return text
      .toLowerCase()
      .replace(/[\W_]+/g, ' ')
      .split(' ')
      .filter(word => word && !stopWords.has(word))
      .map(word => word.trim());
  }
  function frequencyAnalysis(words) {
    return words.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {});
  }
  function extractKeyThemes(freqObj, topN = 5) {
    return Object.entries(freqObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(entry => entry[0]);
  }
  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function combineThemes(themes) {
    if (themes.length < 2) return themes;
    const combinations = [];
    for (let i = 0; i < themes.length; i++) {
      for (let j = i + 1; j < themes.length; j++) {
        combinations.push([themes[i], themes[j]]);
      }
    }
    return combinations;
  }
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function applyIkigai(themes, userWords) {
    const passion = themes.slice(0, 2);
    const skills = themes.slice(2, 4);
    const needs = userWords.filter(w => /помог|реш|улуч|нужн/.test(w));
    const market = themes;
    const ideas = [];
    passion.forEach(p => {
      skills.forEach(s => {
        ideas.push({
          name: `${capitalize(p)} + ${capitalize(s)} Решение`,
          passion: p,
          skills: s,
          needs,
          market,
          desc: `Создать продукт или сервис на основе ${p} и навыков ${s}, чтобы удовлетворить актуальные потребности.`,
        });
      });
    });
    return ideas;
  }
  function generateLeanMvpIdea(themeCombo) {
    const [t1, t2] = themeCombo;
    return {
      name: `MVP по ${capitalize(t1)} и ${capitalize(t2)}`,
      description: `Быстрое создание и запуск простого продукта, сочетающего ${t1} и ${t2} для проверки спроса.`,
      audience: `Пользователи, заинтересованные в ${t1} и ${t2}`,
      problem: `Отсутствие простого решения на пересечении ${t1} и ${t2}`,
      why: `Позволяет быстро протестировать рынок и собрать обратную связь.`,
      needs: `Минимальные технические знания и понимание потребностей рынка.`,
      nextStep: `Сформировать базовый прототип и начать пилотное тестирование.`,
    };
  }
  function creativeIdeaTemplate(themeA, themeB) {
    const templates = [
      `Онлайн-платформа для ${themeA}, интегрированная с сервисами ${themeB}.`,
      `Уникальный сервис, который решает проблему в сфере ${themeA} используя технологии из области ${themeB}.`,
      `Мобильное приложение для улучшения ${themeA} за счет новых подходов из ${themeB}.`,
      `Сообщество экспертов в ${themeA} с обучающими программами по ${themeB}.`,
      `Автоматизированный инструмент, который помогает в ${themeA} используя данные из ${themeB}.`
    ];
    return randomChoice(templates);
  }
  function generateBusinessIdeas(rawText) {
    const words = preprocessText(rawText);
    if(words.length === 0) {
      return [{
        name: "Пустой ввод",
        description: "Пожалуйста, введите больше информации о своих интересах, целях и опыте.",
        aiAnalysis: '',
        plan: '',
        tips: '',
      }];
    }
    const freq = frequencyAnalysis(words);
    const keyThemes = extractKeyThemes(freq, 10);
    const combos = combineThemes(keyThemes);
    const ikigaiIdeas = applyIkigai(keyThemes, words).map(i => ({
      name: i.name,
      description: i.desc + `\n\nAI-анализ: Пересечение ваших интересов (${i.passion}) и навыков (${i.skills}) открывает уникальные возможности для создания востребованного продукта.`,
      audience: "Люди, заинтересованные в сочетании выбранных областей",
      problem: "Нехватка интегрированных решений",
      why: "Пересечение страсти и навыков открывает уникальные возможности",
      needs: "Глубокие знания и мотивация",
      nextStep: "Разработать минимальный прототип и протестировать гипотезу",
      plan: `1. Определите ключевую проблему аудитории.\n2. Сформулируйте ценностное предложение.\n3. Создайте MVP.\n4. Получите обратную связь.\n5. Улучшайте продукт на основе данных.`,
      tips: 'Используйте AI для анализа рынка и поиска первых клиентов.'
    }));
    const leanIdeas = combos.slice(0, 5).map(generateLeanMvpIdea).map(i => ({
      ...i,
      description: i.description + '\n\nAI-анализ: MVP позволяет быстро проверить гипотезу и минимизировать риски.',
      plan: '1. Определите минимальный функционал.\n2. Запустите тестовую версию.\n3. Соберите обратную связь.\n4. Улучшайте продукт.',
      tips: 'Используйте no-code платформы и AI-инструменты для быстрого запуска.'
    }));
    const creativeIdeas = combos.slice(0, 5).map(([a,b]) => ({
      name: `${capitalize(a)} + ${capitalize(b)} инновация`,
      description: creativeIdeaTemplate(a, b) + '\n\nAI-анализ: Креативные сочетания тем часто приводят к появлению новых рынков.',
      audience: `Пользователи, интересующиеся ${a} и ${b}`,
      problem: `Отсутствие удобных решений на стыке ${a} и ${b}`,
      why: `Новые технологии и подходы позволяют создать востребованный продукт.`,
      needs: `Инновационные идеи, команда разработчиков и маркетинг.`,
      nextStep: `Исследовать рынок и определить ключевые потребности.`,
      plan: '1. Проведите мозговой штурм.\n2. Найдите партнёров.\n3. Создайте прототип.\n4. Протестируйте на целевой аудитории.',
      tips: 'Не бойтесь экспериментировать и использовать AI для генерации идей.'
    }));
    let allIdeas = [...ikigaiIdeas, ...leanIdeas, ...creativeIdeas];
    const seen = new Set();
    allIdeas = allIdeas.filter(i => {
      if(seen.has(i.name)) return false;
      seen.add(i.name);
      return true;
    });
    // Добавляем больше персонализации и советов
    allIdeas = allIdeas.map((idea, idx) => ({
      ...idea,
      description: idea.description + `\n\nПример: ${capitalize(keyThemes[idx % keyThemes.length])} + AI = новый сервис для персонализированных рекомендаций.`,
      tips: (idea.tips || '') + ' Используйте современные AI-инструменты для анализа конкурентов и поиска первых клиентов.'
    }));
    return allIdeas.slice(0, 7);
  }
  return { generateBusinessIdeas };
})();

// --- AI-режим генерации идей ---
let useAIGenerator = false;

// Кнопка/переключатель AI-режима (можно добавить в UI)
window.enableAIGenerator = function(enable) {
  useAIGenerator = !!enable;
};

// --- ГЛУБОКИЙ ГЕНЕРАТОР БИЗНЕС-ИДЕЙ ---
function generateIdeas(a) {
  // Если включён AI-режим — используем BusinessIdeaGenerator
  if (useAIGenerator) {
    // Собираем текст из ответов анкеты
    let rawText = '';
    Object.keys(a).forEach(key => {
      if (Array.isArray(a[key])) rawText += a[key].join(' ') + ' ';
      else rawText += a[key] + ' ';
    });
    const aiIdeas = BusinessIdeaGenerator.generateBusinessIdeas(rawText.trim());
    // Преобразуем формат для showIdeas
    return aiIdeas.map(idea => ({
      icon: '🤖',
      title: idea.name,
      desc: idea.description,
      audience: idea.audience || '',
      pain: idea.problem || '',
      why: idea.why || '',
      start: idea.needs || '',
      step: idea.nextStep || '',
      advice: 'Используй креатив и AI для быстрого старта!'
    }));
  }
  // 1. Анализируем паттерны и потенциал
  const ideas = [];
  // --- Пример анализа ---
  // 1. Креативная комбинация интересов, навыков, боли, формата, капитала, времени, региона
  // 2. Проверка на реальность, масштабируемость, применимость
  // 3. Индивидуальный совет и план

  // --- Пример 1 ---
  if (a.interests.includes('Технологии') && a.skills.includes('Технические')) {
    // Технологии + Технические навыки
    if (a.problem && a.problem.length > 5) {
      ideas.push({
        icon: '🤖',
        title: 'Локальный AI-сервис для решения вашей боли',
        desc: `Создайте онлайн-сервис, который с помощью искусственного интеллекта решает вашу проблему: "${a.problem}". Например, если это "нет времени на спорт" — сервис подбирает индивидуальные короткие тренировки под ваш график.`,
        audience: 'Люди с похожей проблемой в вашем регионе',
        pain: a.problem,
        why: 'AI-сервисы быстро растут, а локализация и персонализация — тренд.',
        start: 'Минимум: ноу-код платформа, Telegram-бот, лендинг. Можно начать без вложений.',
        step: 'Сформулируйте проблему, опишите решение, создайте MVP на no-code.',
        advice: 'Сделайте упор на персонализацию и локальный маркетинг.'
      });
    }
  }

  // --- Пример 2 ---
  if (a.interests.includes('Образование') && a.skills.includes('Коммуникативные')) {
    ideas.push({
      icon: '🎓',
      title: 'Микро-онлайн-школа для взрослых с вашей болью',
      desc: `Создайте онлайн-курс или клуб для людей, которые испытывают ту же проблему, что и вы: "${a.problem}". Например, если это "страх публичных выступлений" — курс по уверенности для взрослых.`,
      audience: 'Взрослые, желающие решить похожую проблему',
      pain: a.problem,
      why: 'Образовательные клубы и микро-школы — тренд, а личный опыт — ценность.',
      start: 'Платформа: Zoom, Telegram, Notion. Можно начать с мини-группы.',
      step: 'Соберите 5-10 человек, проведите бесплатный вебинар, получите обратную связь.',
      advice: 'Используйте сторителлинг и личный опыт для вовлечения.'
    });
  }

  // --- Пример 3 ---
  if (a.interests.includes('Спорт') && a.skills.includes('Аналитика')) {
    ideas.push({
      icon: '🏃‍♂️',
      title: 'Трекер спортивных привычек для малых городов',
      desc: `Создайте мобильное приложение или Telegram-бот, который помогает жителям малых городов отслеживать и улучшать спортивные привычки.`,
      audience: 'Жители малых городов, желающие заниматься спортом',
      pain: 'Недостаток мотивации и инфраструктуры',
      why: 'В малых городах мало сервисов для спорта, а привычки формируются в группе.',
      start: 'MVP: Telegram-бот, Google-таблицы, локальные чаты.',
      step: 'Сделайте MVP, найдите 10-20 пользователей, соберите отзывы.',
      advice: 'Добавьте геймификацию и локальные челленджи.'
    });
  }

  // --- Пример 4: если капитал минимальный, время мало, но есть креатив ---
  if (a.capital === '0' && (a.freeTime === '<1 часа' || a.freeTime === '1-2 часа') && a.strengths.includes('Креативность')) {
    ideas.push({
      icon: '📱',
      title: 'Микро-контент для соцсетей на заказ',
      desc: 'Создайте сервис по созданию коротких видео, мемов или постов для локального бизнеса или экспертов.',
      audience: 'Малый бизнес, эксперты, блогеры',
      pain: 'Нет времени и идей для контента',
      why: 'Спрос на микро-контент растёт, а входной порог минимален.',
      start: 'Телефон, Canva, Telegram-бот. Можно начать без вложений.',
      step: 'Сделайте 3-5 примеров, предложите услуги знакомым.',
      advice: 'Сделайте упор на скорость и персонализацию.'
    });
  }

  // --- Пример 5: если цель — изменить мир, опыт малый, но есть желание ---
  if (a.goal === 'Изменить мир' && (a.bizexp === 'Нет' || a.bizexp === 'Маленький (до 1 года)')) {
    ideas.push({
      icon: '🌍',
      title: 'Социальный мини-проект для локального сообщества',
      desc: 'Запустите проект, который решает локальную проблему (экология, образование, спорт) с помощью простых инструментов.',
      audience: 'Жители вашего города/района',
      pain: 'Локальные проблемы, которые никто не решает',
      why: 'Социальные проекты часто перерастают в бизнес.',
      start: 'Telegram-канал, встречи, опросы.',
      step: 'Соберите единомышленников, проведите первую акцию.',
      advice: 'Делайте упор на реальный результат и вовлечение.'
    });
  }

  // --- Если ничего не подошло, универсальная идея ---
  if (ideas.length === 0) {
    ideas.push({
      icon: '💡',
      title: 'Персональный консалтинг или микросервис',
      desc: 'Используйте свои навыки и опыт, чтобы помогать другим решать их задачи за небольшую плату.',
      audience: 'Люди с похожими задачами',
      pain: 'Нет времени, знаний или мотивации',
      why: 'Микроуслуги и консалтинг — быстрый старт без вложений.',
      start: 'Telegram, Zoom, Notion.',
      step: 'Сделайте лендинг, предложите первую консультацию.',
      advice: 'Соберите отзывы и улучшайте сервис.'
    });
  }

  // Вернуть 1-3 идей, индивидуальный план
  return ideas.slice(0, 3);
}

function showIdeas(ideas) {
  ideasOutput.innerHTML = '';
  ideas.forEach(idea => {
    const card = document.createElement('div');
    card.className = 'idea-card';
    card.style.borderLeft = '6px solid var(--accent-primary)';
    card.style.animation = 'fadeInUp 0.7s';
    card.innerHTML = `
      <div style="font-size:2.2rem;line-height:1">${idea.icon || '🤖'}</div>
      <div class="idea-title">${idea.title}</div>
      <div class="idea-section"><b>Описание:</b> ${idea.description}</div>
      <div class="idea-section"><b>Целевая аудитория:</b> ${idea.audience}</div>
      <div class="idea-section"><b>Проблема:</b> ${idea.pain}</div>
      <div class="idea-section"><b>Почему это может работать:</b> ${idea.why}</div>
      <div class="idea-section"><b>Что нужно для запуска:</b> ${idea.start}</div>
      <div class="idea-section"><b>Следующий шаг:</b> ${idea.step}</div>
      ${idea.plan ? `<div class="idea-section"><b>План запуска:</b> ${idea.plan}</div>` : ''}
      ${idea.tips ? `<div class="idea-section"><b>AI-совет:</b> <span style="color:var(--accent-secondary)">${idea.tips}</span></div>` : ''}
    `;
    ideasOutput.appendChild(card);
  });
}

// --- ПРОКАЧАЙСЯ: КУРСЫ, УРОВНИ, АЧИВКИ ---
const courses = [
  // --- СТАРЫЕ КУРСЫ ---
  {
    title: 'Мышление Миллиардера',
    goal: 'Освоить мышление и привычки самых успешных предпринимателей мира.',
    levels: ['Базовый', 'Продвинутый'],
    topics: [
      'Масштабное мышление',
      'Привычки успеха',
      'Финансовое мышление',
      'Стратегии инвестирования',
      'Нетворкинг и окружение',
    ],
    exercises: ['Список установок роста', 'Внедрение ритуала', 'Анализ окружения', 'Мини-инвестиция'],
    checklist: ['Мыслю масштабно', 'Внедряю привычки успеха', 'Инвестирую в себя', 'Строю окружение', 'Ищу возможности'],
    minigame: 'Мини-игра: Мышление 10X',
    link: 'course-billionaire.html'
  },
  {
    title: 'Запуск без денег',
    goal: 'Научиться запускать проекты и бизнесы с минимальными ресурсами.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Мышление стартапера',
      'Lean Startup и MVP',
      'Поиск первых клиентов',
      'Креативные способы продвижения',
      'Рост и масштабирование',
    ],
    exercises: ['Идея за 3 дня', 'MVP для 5 человек', 'Первая продажа', 'Бесплатное продвижение'],
    checklist: ['Не жду идеальных условий', 'Тестирую идеи быстро', 'Ищу первых клиентов', 'Использую креатив', 'Учусь на обратной связи'],
    minigame: 'Мини-игра: Стартап за 72 часа',
    link: 'course-nomoney.html'
  },
  {
    title: 'Найди свою нишу',
    goal: 'Понять, как выбрать прибыльную нишу для бизнеса или карьеры.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Самоанализ и сильные стороны',
      'Анализ рынка',
      'Проверка спроса',
      'Конкуренты и уникальность',
      'Старт в выбранной нише',
    ],
    exercises: ['Список сильных сторон', 'Анализ 5 ниш', 'Мини-опрос', 'SWOT-анализ'],
    checklist: ['Знаю сильные стороны', 'Изучил рынок', 'Протестировал спрос', 'Выбрал нишу', 'Сделал первые шаги'],
    minigame: 'Мини-игра: Охотник за нишами',
    link: 'course-niche.html'
  },
  {
    title: 'Деньги — это система',
    goal: 'Понять, как устроена денежная система и как выстроить свою.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Как работает денежная система',
      'Финансовые потоки',
      'Создание активов',
      'Финансовое планирование',
      'Личная финансовая система',
    ],
    exercises: ['Анализ доходов и расходов', 'Финплан на год', 'Определить активы и пассивы', 'Автоматизация сбережений'],
    checklist: ['Понимаю систему', 'Управляю потоками', 'Создаю активы', 'Планирую финансы', 'Автоматизирую деньги'],
    minigame: 'Мини-игра: Финансовый архитектор',
    link: 'course-system.html'
  },
  {
    title: 'Курс "Режим БОГА"',
    goal: 'Прокачать самодисциплину и силу воли.',
    levels: ['Начальный', 'Продвинутый'],
    topics: [
      'Самодисциплина на уровне сверхлюдей',
      'Установка режима ультрафокуса',
      'Победа над слабостью',
      'Построение новой личности',
      'Ежедневный трекер силы',
      'Становление богом',
      'Выход из матрицы',
    ],
    exercises: ['Трекер привычек', 'Дневник силы', 'Челлендж "21 день"'],
    checklist: ['Вести трекер', 'Выполнить челлендж'],
    minigame: 'Прокачай силу воли — не пропусти ни дня!',
    link: 'course-godmode.html'
  },
  // --- НОВЫЕ КУРСЫ ---
  {
    title: 'Деньги как мышление',
    goal: 'Научиться мыслить как богатый человек, чтобы деньги стали естественным результатом твоих действий.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Денежные установки',
      'Психология богатства',
      'Финансовые привычки',
      'Мышление изобилия',
      'Ошибки бедного мышления',
    ],
    exercises: ['Анализ установок', 'Дневник расходов', 'Практика благодарности'],
    checklist: ['Провести аудит мышления', 'Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Прокачай денежное мышление!',
    link: 'course-money.html'
  },
  {
    title: 'Сверхдисциплина',
    goal: 'Научиться управлять собой, вырабатывать полезные привычки и достигать целей без прокрастинации.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Сила воли',
      'Планирование',
      'Преодоление прокрастинации',
      'Тайм-менеджмент',
      'Техники самоконтроля',
    ],
    exercises: ['Трекер привычек', 'План на неделю', 'Практика самоконтроля'],
    checklist: ['Вести трекер', 'Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Проверь свою дисциплину!',
    link: 'course-discipline.html'
  },
  {
    title: 'Лидерство нового времени',
    goal: 'Научиться быть лидером в жизни, бизнесе и команде нового времени.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Лидерство и влияние',
      'Командная работа',
      'Мотивация',
      'Стратегическое мышление',
      'Лидерские привычки',
    ],
    exercises: ['Анализ лидерских качеств', 'Практика влияния', 'Командные задания'],
    checklist: ['Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Стань лидером команды!',
    link: 'course-leadership.html'
  },
  {
    title: 'Финансовая грамотность',
    goal: 'Научиться управлять деньгами, инвестировать и строить своё финансовое будущее.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Бюджетирование',
      'Инвестиции',
      'Финансовое планирование',
      'Пассивный доход',
      'Финансовые ошибки',
    ],
    exercises: ['Составить бюджет', 'План инвестиций', 'Анализ расходов'],
    checklist: ['Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Прокачай финансовую грамотность!',
    link: 'course-finance.html'
  },
  {
    title: 'Мышление роста',
    goal: 'Научиться мыслить как человек, который всегда развивается и достигает большего.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Гибкость мышления',
      'Преодоление ограничений',
      'Постановка целей',
      'Обратная связь',
      'Рост через ошибки',
    ],
    exercises: ['Рефлексия', 'План развития', 'Практика обратной связи'],
    checklist: ['Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Прокачай мышление роста!',
    link: 'course-mindset.html'
  },
  {
    title: 'Привычки успеха',
    goal: 'Научиться формировать привычки, которые ведут к результату и счастью.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Сила привычек',
      'Формирование новых привычек',
      'Преодоление вредных привычек',
      'Продуктивные ритуалы',
      'Привычки успешных людей',
    ],
    exercises: ['Анализ привычек', 'Трекер привычек', 'Практика благодарности'],
    checklist: ['Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Прокачай привычки успеха!',
    link: 'course-habits.html'
  },
  // --- КУРСЫ "СКОРО" ---
  {
    title: 'Сила влияния и коммуникации',
    goal: 'Научиться влиять на людей и эффективно коммуницировать.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Влияние и убеждение',
      'Сила слова и невербальная коммуникация',
      'Психология манипуляций',
      'Построение доверия',
      'Этика влияния',
    ],
    exercises: ['Практика аргументации', 'Анализ речевых паттернов', 'Тренировка эмпатии'],
    checklist: ['Выполнить упражнения', 'Провести переговоры', 'Пройти мини-тест'],
    minigame: 'Прокачай силу влияния!',
    link: 'course-influence.html'
  },
  {
    title: 'Мастер продуктивности',
    goal: 'Освоить техники продуктивности и управления временем.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Тайм-менеджмент',
      'Планирование и приоритеты',
      'Работа с прокрастинацией',
      'Фокус и концентрация',
      'Продуктивные привычки',
    ],
    exercises: ['Трекер задач', 'Техника Pomodoro', 'План на неделю'],
    checklist: ['Вести трекер', 'Выполнить упражнения', 'Пройти мини-тест'],
    minigame: 'Проверь свою продуктивность!',
    link: 'course-productivity.html'
  },
  {
    title: 'Эмоциональный интеллект для успеха',
    goal: 'Развить эмоциональный интеллект для личного и профессионального роста.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Понимание своих эмоций',
      'Управление эмоциями',
      'Эмпатия и социальные навыки',
      'Стрессоустойчивость',
      'Эмоциональный интеллект в работе и жизни',
    ],
    exercises: ['Дневник эмоций', 'Пауза перед реакцией', 'Эмпатическое слушание', 'Чек-лист стрессоустойчивости'],
    checklist: ['Отслеживать эмоции', 'Применять техники саморегуляции', 'Практиковать эмпатию', 'Использовать методы борьбы со стрессом', 'Применять EQ в жизни'],
    minigame: 'Мини-игра: Эмоциональный детектив',
    link: 'course-emotional.html'
  },
  {
    title: 'Стратегическое мышление',
    goal: 'Научиться мыслить стратегически и принимать эффективные решения.',
    levels: ['Базовый', 'Средний'],
    topics: [
      'Основы стратегического мышления',
      'Постановка и достижение целей',
      'Анализ и принятие решений',
      'Гибкость и адаптация',
      'Стратегии успеха в жизни и бизнесе',
    ],
    exercises: ['Постановка целей', 'SWOT-анализ', 'Рефлексия решений'],
    checklist: ['Поставить цель', 'Проанализировать ситуацию', 'Принять стратегическое решение'],
    minigame: 'Мини-игра: Стратегический вызов',
    link: 'course-strategy.html'
  },
];

const achievementsList = [
  { icon: '🚀', text: 'Первая идея' },
  { icon: '💡', text: 'Генератор идей' },
  { icon: '🏆', text: 'Пройден курс' },
  { icon: '🔥', text: '7 дней подряд' },
  { icon: '👑', text: 'Уровень 5' },
];

let userLevel = 1;
let userXP = 10;

function renderCourses() {
  const list = document.getElementById('courses-list');
  list.innerHTML = '';
  courses.forEach((course, idx) => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-title">${course.title} <span class="level-badge">${course.levels.join(', ')}</span></div>
      <div class="course-section"><b>Цель:</b> ${course.goal}</div>
      <div class="course-section"><b>Темы:</b> ${course.topics.join('; ')}</div>
      <div class="course-section"><b>Упражнения:</b> ${course.exercises.join('; ')}</div>
      <div class="course-section"><b>Чек-лист:</b> ${course.checklist.join('; ')}</div>
      <div class="course-section"><b>Мини-игра:</b> ${course.minigame}</div>
      <button class="btn-main" onclick="startCourse(${idx})">Начать</button>
    `;
    list.appendChild(card);
  });
}

function renderAchievements() {
  const ach = document.getElementById('achievements');
  ach.innerHTML = '';
  achievementsList.forEach(a => {
    const el = document.createElement('div');
    el.className = 'achievement';
    el.innerHTML = `<span>${a.icon}</span> ${a.text}`;
    ach.appendChild(el);
  });
}

function updateLevelBar() {
  document.getElementById('user-level').textContent = userLevel;
  document.getElementById('level-bar-inner').style.width = Math.min(userXP, 100) + '%';
}

window.startCourse = function(idx) {
  userXP += 20;
  if (userXP >= 100) { userLevel++; userXP = 10; mentorSay('Поздравляю! Ты повысил уровень!'); }
  updateLevelBar();
  mentorSay('Курс начат! Выполняй задания и получай ачивки.');
  const course = courses[idx];
  if (course.link) {
    window.location.href = course.link;
  } else {
    mentorSay('Этот курс скоро будет доступен!');
  }
};

// --- ИНИЦИАЛИЗАЦИЯ ---
if (window.location.href.includes('prokachaysya.html')) {
  renderCourses();
  renderAchievements();
  updateLevelBar();
} else {
  renderAll();
  renderCourses();
  renderAchievements();
  updateLevelBar();
}

// --- АНИМАЦИЯ ---
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeInUp {from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}`;
document.head.appendChild(style); 