export class Carousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.options = {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            responsive: [
                { breakpoint: 1024, slidesToShow: 2 },
                { breakpoint: 768, slidesToShow: 1 },
            ],
            ...options,
        };

        this.cardsContainer = this.container.querySelector(
            ".carousel__cards_container"
        );
        this.cards = Array.from(
            this.container.querySelectorAll(".carousel__card")
        );
        this.prevBtn = this.container.querySelector(".carousel__btn_left");
        this.nextBtn = this.container.querySelector(".carousel__btn_right");
        this.currentSlide = 0;
        this.cardWidth = 0;
        this.gap = 0;

        this._init();
    }

    _init() {
        this._setupStyles();
        this._setupEventListeners();
        this._updateSlider();
        this._handleResponsive();
    }

    _setupStyles() {
        this.cardsContainer.style.display = "flex";
        this.cardsContainer.style.transition = "transform 0.5s ease";
        this.cards.forEach((card) => {
            card.style.flex = `0 0 calc(${100 / this.options.slidesToShow}% - ${
                this.gap
            }px)`;
        });
    }

    _setupEventListeners() {
        this.prevBtn.addEventListener("click", () => this._goToPrev());
        this.nextBtn.addEventListener("click", () => this._goToNext());

        window.addEventListener("resize", () => {
            this._updateSlider();
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
            this._updateSlider();
        }
    }

    _updateSlider() {
        const containerWidth = this.container.offsetWidth;
        this.cardWidth = containerWidth / this.options.slidesToShow;
        this.gap = parseInt(getComputedStyle(this.cardsContainer).gap) || 0;

        this.cards.forEach((card) => {
            card.style.flex = `0 0 calc(${100 / this.options.slidesToShow}% - ${
                this.gap
            }px)`;
        });

        this._moveToSlide(this.currentSlide);
    }

    _moveToSlide(slideIndex) {
        const translateX = -slideIndex * (this.cardWidth + this.gap);
        this.cardsContainer.style.transform = `translateX(${translateX}px)`;

        // Обновляем состояние кнопок
        this._updateButtons();
    }

    _goToPrev() {
        if (this.currentSlide === 0 && !this.options.infinite) return;

        this.currentSlide =
            (this.currentSlide -
                this.options.slidesToScroll +
                this.cards.length) %
            this.cards.length;
        this._moveToSlide(this.currentSlide);
    }

    _goToNext() {
        const maxSlide = this.cards.length - this.options.slidesToShow;
        if (this.currentSlide >= maxSlide && !this.options.infinite) return;

        this.currentSlide =
            (this.currentSlide + this.options.slidesToScroll) %
            this.cards.length;
        this._moveToSlide(this.currentSlide);
    }

    _updateButtons() {
        if (!this.options.infinite) {
            const maxSlide = this.cards.length - this.options.slidesToShow;
            this.prevBtn.disabled = this.currentSlide === 0;
            this.nextBtn.disabled = this.currentSlide >= maxSlide;
        }
    }
}
