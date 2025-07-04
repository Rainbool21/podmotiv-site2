// Blog - Блог
class Blog {
    constructor() {
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
    }
    
    setupEventListeners() {
        // Категории
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.filterByCategory(e.currentTarget.dataset.category);
            });
        });
        
        // Статьи
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.article-stats')) {
                    this.openArticle(card);
                }
            });
        });
        
        // Лайки
        document.querySelectorAll('.likes').forEach(like => {
            like.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLike(e.target.closest('.likes'));
            });
        });
        
        // Поиск
        const searchInput = document.getElementById('search-articles');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.filterArticles();
            });
        }
        
        // Кнопка поиска
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }
        
        // Сортировка
        const sortSelect = document.getElementById('sort-articles');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortArticles(e.target.value);
            });
        }
    }
    
    performSearch() {
        if (this.searchQuery.trim()) {
            this.filterArticles();
            this.showNotification(`Найдено статей по запросу "${this.searchQuery}": ${this.getVisibleArticlesCount()}`, 'info');
        } else {
            this.showNotification('Введите текст для поиска', 'error');
        }
    }
    
    openArticle(card) {
        const link = card.querySelector('.article-link');
        if (link && link.href) {
            this.showNotification('Открывается статья в новой вкладке...', 'info');
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 500);
        }
    }
    
    filterArticles() {
        const articles = document.querySelectorAll('.article-card');
        let visibleCount = 0;
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.category').textContent.toLowerCase();
            
            const matchesSearch = !this.searchQuery || 
                title.includes(this.searchQuery.toLowerCase()) ||
                content.includes(this.searchQuery.toLowerCase()) ||
                category.includes(this.searchQuery.toLowerCase());
            
            const matchesCategory = this.currentCategory === 'all' || 
                article.dataset.category === this.currentCategory;
            
            if (matchesSearch && matchesCategory) {
                article.style.display = 'block';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });
        
        this.updateArticleCount(visibleCount);
    }
    
    getVisibleArticlesCount() {
        return document.querySelectorAll('.article-card[style*="block"]').length;
    }
    
    sortArticles(sortType) {
        const articlesContainer = document.querySelector('.articles-grid');
        const articles = Array.from(articlesContainer.children);
        
        articles.sort((a, b) => {
            switch (sortType) {
                case 'views':
                    const viewsA = parseInt(a.querySelector('.views').textContent.replace(/\D/g, ''));
                    const viewsB = parseInt(b.querySelector('.views').textContent.replace(/\D/g, ''));
                    return viewsB - viewsA;
                case 'likes':
                    const likesA = parseInt(a.querySelector('.likes').textContent.replace(/\D/g, ''));
                    const likesB = parseInt(b.querySelector('.likes').textContent.replace(/\D/g, ''));
                    return likesB - likesA;
                case 'title':
                    const titleA = a.querySelector('h3').textContent;
                    const titleB = b.querySelector('h3').textContent;
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });
        
        articles.forEach(article => {
            articlesContainer.appendChild(article);
        });
        
        this.showNotification(`Статьи отсортированы`, 'info');
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        this.filterArticles();
    }
    
    toggleLike(likeElement) {
        const icon = likeElement.querySelector('i');
        const count = likeElement.querySelector('span');
        
        if (likeElement.classList.contains('liked')) {
            likeElement.classList.remove('liked');
            const currentCount = parseInt(count.textContent);
            count.textContent = currentCount - 1;
        } else {
            likeElement.classList.add('liked');
            const currentCount = parseInt(count.textContent);
            count.textContent = currentCount + 1;
        }
    }
    
    updateArticleCount(count) {
        const counter = document.getElementById('articles-counter');
        if (counter) {
            if (count !== undefined) {
                counter.textContent = `Показано ${count} статей`;
            } else {
                const visibleArticles = document.querySelectorAll('.article-card[style*="block"]').length;
                const totalArticles = document.querySelectorAll('.article-card').length;
                counter.textContent = `Показано ${visibleArticles} из ${totalArticles} статей`;
            }
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
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
                notification.remove();
            }, 300);
        }, 3000);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    setupAnimations() {
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
        
        document.querySelectorAll('.category-card, .article-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Инициализация блога
document.addEventListener('DOMContentLoaded', () => {
    new Blog();
});
