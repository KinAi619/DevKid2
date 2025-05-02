export class TeachersCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.options = {
            slidesToShow: 4,
            slideInterval: 2000,
            animationSpeed: 500,
            responsive: [
                { breakpoint: 1200, slidesToShow: 3 },
                { breakpoint: 768, slidesToShow: 2 },
                { breakpoint: 576, slidesToShow: 1 },
            ],
            ...options,
        };

        this.carouselContainer = this.container.querySelector(
            ".teachers__carousel_container"
        );
        this.cards = Array.from(
            this.container.querySelectorAll(".teachers__card")
        );
        this.currentIndex = 0;
        this.interval = null;
        this.isPaused = false;

        this._cloneCards();
        this._initCarousel();
        this._setupEventListeners();
        this._handleResponsive();
    }

    _cloneCards() {
        // Клонируем карточки для бесконечного эффекта
        const clones = this.cards.map((card) => card.cloneNode(true));
        clones.forEach((clone) => {
            clone.classList.add("teachers__card--clone");
            this.carouselContainer.appendChild(clone);
        });
    }

    _initCarousel() {
        this.cardWidth = this.cards[0].offsetWidth;
        this.carouselContainer.style.display = "flex";
        this.carouselContainer.style.transition = `transform ${this.options.animationSpeed}ms ease`;
        this._updateCarousel();
        this._startAutoSlide();
    }

    _updateCarousel() {
        const offset = -this.currentIndex * this.cardWidth;
        this.carouselContainer.style.transform = `translateX(${offset}px)`;
    }

    _nextSlide() {
        this.currentIndex++;

        // Плавный переход к следующему слайду
        this._updateCarousel();

        // Если дошли до конца - мгновенно (без анимации) переходим в начало
        if (this.currentIndex >= this.cards.length) {
            setTimeout(() => {
                this.carouselContainer.style.transition = "none";
                this.currentIndex = 0;
                this._updateCarousel();

                // Возвращаем анимацию
                setTimeout(() => {
                    this.carouselContainer.style.transition = `transform ${this.options.animationSpeed}ms ease`;
                }, 20);
            }, this.options.animationSpeed);
        }
    }

    _startAutoSlide() {
        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this._nextSlide();
            }
        }, this.options.slideInterval);
    }

    _stopAutoSlide() {
        clearInterval(this.interval);
    }

    _setupEventListeners() {
        // Пауза при наведении
        this.carouselContainer.addEventListener("mouseenter", () => {
            this.isPaused = true;
        });

        // Возобновление при уходе курсора
        this.carouselContainer.addEventListener("mouseleave", () => {
            this.isPaused = false;
        });

        // Обработка изменения размера окна
        window.addEventListener("resize", () => {
            this.cardWidth = this.cards[0].offsetWidth;
            this._updateCarousel();
            this._handleResponsive();
        });
    }

    _handleResponsive() {
        const windowWidth = window.innerWidth;
        let slidesToShow = this.options.slidesToShow;

        this.options.responsive.forEach((breakpoint) => {
            if (windowWidth <= breakpoint.breakpoint) {
                slidesToShow = breakpoint.slidesToShow;
            }
        });

        if (slidesToShow !== this.options.slidesToShow) {
            this.options.slidesToShow = slidesToShow;
            this._updateCarousel();
        }
    }
}
