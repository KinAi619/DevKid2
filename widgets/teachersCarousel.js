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
        this.isAnimating = false;
        this.gap = parseInt(getComputedStyle(this.carouselContainer).gap) || 20; // Получаем отступ между карточками

        this._prepareCarousel();
        this._initCarousel();
        this._setupEventListeners();
        this._handleResponsive();
    }

    _prepareCarousel() {
        // Клонируем карточки для бесконечного эффекта
        const clones = this.cards.map((card) => card.cloneNode(true));
        clones.forEach((clone) => {
            clone.classList.add("teachers__card--clone");
            this.carouselContainer.appendChild(clone);
        });

        // Обновляем список карточек
        this.allCards = Array.from(
            this.carouselContainer.querySelectorAll(".teachers__card")
        );
    }

    _initCarousel() {
        this.cardWidth = this.cards[0].offsetWidth;
        this.carouselContainer.style.display = "flex";
        this.carouselContainer.style.transition = `transform ${this.options.animationSpeed}ms ease`;
        this._updatePosition();
        this._startAutoSlide();
    }

    _updatePosition() {
        const offset = -this.currentIndex * (this.cardWidth + this.gap);
        this.carouselContainer.style.transform = `translateX(${offset}px)`;
    }

    _nextSlide() {
        if (this.isAnimating || this.isPaused) return;

        this.isAnimating = true;
        this.currentIndex++;

        this._updatePosition();

        // Когда доходим до конца клонов, мгновенно переходим в начало
        if (this.currentIndex >= this.cards.length) {
            setTimeout(() => {
                this.carouselContainer.style.transition = "none";
                this.currentIndex = 0;
                this._updatePosition();

                // Восстанавливаем анимацию после перехода
                setTimeout(() => {
                    this.carouselContainer.style.transition = `transform ${this.options.animationSpeed}ms ease`;
                    this.isAnimating = false;
                }, 20);
            }, this.options.animationSpeed);
        } else {
            setTimeout(() => {
                this.isAnimating = false;
            }, this.options.animationSpeed);
        }
    }

    _startAutoSlide() {
        this.interval = setInterval(
            () => this._nextSlide(),
            this.options.slideInterval
        );
    }

    _stopAutoSlide() {
        clearInterval(this.interval);
    }

    _setupEventListeners() {
        this.carouselContainer.addEventListener("mouseenter", () => {
            this.isPaused = true;
        });

        this.carouselContainer.addEventListener("mouseleave", () => {
            this.isPaused = false;
        });

        window.addEventListener("resize", () => {
            this.cardWidth = this.cards[0].offsetWidth;
            this.gap =
                parseInt(getComputedStyle(this.carouselContainer).gap) || 20;
            this._updatePosition();
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
            this._updatePosition();
        }
    }
}
