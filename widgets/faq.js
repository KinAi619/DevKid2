export function faq() {
    const faqArticles = document.querySelectorAll(".faq__article");

    // Добавляем обработчик клика для каждого элемента
    faqArticles.forEach((article) => {
        const container = article.querySelector(".faq__qa__container");
        const question = article.querySelector(".faq__question");
        const answer = article.querySelector(".faq__answer");
        const svg = article.querySelector(".faq__article__svg");

        // Делаем контейнер фокусируемым
        container.setAttribute("tabindex", "0");
        container.setAttribute("role", "button");
        container.setAttribute("aria-expanded", "false");
        container.setAttribute(
            "aria-controls",
            answer.id || `answer-${Math.random().toString(36).substr(2, 9)}`
        );

        if (!answer.id) {
            answer.id = container.getAttribute("aria-controls");
        }

        // Обработчик клика на контейнер или SVG
        function handleClick() {
            const isExpanded =
                container.getAttribute("aria-expanded") === "true";

            // Переключаем классы
            question.classList.toggle("faq__question__active");
            answer.classList.toggle("faq__answer__active");
            svg.classList.toggle("faq__article__svg__active");

            // Обновляем ARIA-атрибуты
            container.setAttribute("aria-expanded", !isExpanded);

            // Анимация
            if (isExpanded) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        }

        // Обработчики для клика
        container.addEventListener("click", handleClick);
        svg.addEventListener("click", handleClick);

        // Обработчик клавиатуры
        container.addEventListener("keydown", function (e) {
            if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                e.preventDefault();
                handleClick();
            }
        });
    });
}
