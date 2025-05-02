import { startTimer } from "./widgets/timer.js";
import { faq } from "./widgets/faq.js";
import { modal } from "./widgets/modal.js";
import { Carousel } from "./widgets/carousel.js";
import { TeachersCarousel } from "./widgets/teachersCarosel.js";

// Инициализация карусели
const teachersCarousel = new TeachersCarousel(".teachers_section_container", {
    slidesToShow: 4,
    slideInterval: 2000,
    animationSpeed: 500,
    responsive: [
        { breakpoint: 1200, slidesToShow: 3 },
        { breakpoint: 768, slidesToShow: 2 },
        { breakpoint: 576, slidesToShow: 1 },
    ],
});

// Инициализация карусели
const carousel = new Carousel(".carousel_container", {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
        { breakpoint: 1024, slidesToShow: 2 },
        { breakpoint: 768, slidesToShow: 1 },
    ],
});

document.addEventListener("DOMContentLoaded", () => {
    startTimer(7200, "timer");
    faq();
    modal();
});
