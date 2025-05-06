export class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            selector: 'a[href^="#"]', // Селектор якорных ссылок
            offset: 0, // Дополнительное смещение (например, для фиксированного хедера)
            duration: 800, // Длительность анимации
            easing: "easeInOutQuad", // Функция плавности
            ...options,
        };

        this._init();
    }

    _init() {
        // Находим все якорные ссылки
        this.links = document.querySelectorAll(this.options.selector);

        // Добавляем обработчики
        this.links.forEach((link) => {
            link.addEventListener("click", (e) => this._handleClick(e));
        });
    }

    _handleClick(e) {
        e.preventDefault();

        const targetId = e.currentTarget.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        this._scrollTo(targetElement);
    }

    _scrollTo(target) {
        const startPosition = window.pageYOffset;
        const targetPosition =
            target.getBoundingClientRect().top +
            startPosition -
            this.options.offset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.options.duration, 1);
            const easeProgress = this._easingFunction(progress);

            window.scrollTo({
                top: startPosition + distance * easeProgress,
                behavior: "auto",
            });

            if (timeElapsed < this.options.duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    _easingFunction(t) {
        // Различные функции плавности
        switch (this.options.easing) {
            case "easeInQuad":
                return t * t;
            case "easeOutQuad":
                return t * (2 - t);
            case "easeInOutQuad":
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            case "easeInCubic":
                return t * t * t;
            case "easeOutCubic":
                return --t * t * t + 1;
            case "easeInOutCubic":
                return t < 0.5
                    ? 4 * t * t * t
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            default:
                return t;
        }
    }

    // Обновить смещение (например, после изменения высоты хедера)
    updateOffset(newOffset) {
        this.options.offset = newOffset;
    }
}
