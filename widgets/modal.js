export function modal() {
    const openModalButtons = document.querySelectorAll(".btn_sign_up");
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_overlay");
    const inputTel = document.querySelector(".input__tel");
    const closeModalButton = document.querySelector(".close_btn");
    const inputName = document.querySelector(".input__name");
    const modalForm = document.querySelector(".modal__form");

    openModalButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.classList.add("modal_active");
        });
    });

    modalOverlay.addEventListener("click", () => {
        modal.classList.remove("modal_active");
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("modal_active");
    });

    // Телефон
    inputTel.addEventListener("input", function (e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, ""); // Оставляем только цифры

        // Если номер начинается с 8, заменяем на 7 (для российских номеров)
        if (value.startsWith("8")) {
            value = "7" + value.slice(1);
        }

        // Если номер не начинается с 7, но пользователь не ввёл +7 вручную
        if (!value.startsWith("7") && !input.value.startsWith("+7")) {
            value = "7" + value; // Добавляем 7 в начало
        }

        // Разбиваем номер на группы для форматирования
        const groups = value
            .slice(1)
            .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

        // Форматируем номер: +7 (XXX) XXX-XX-XX
        let formattedValue =
            "+7" +
            (groups[1] ? " (" + groups[1] : "") +
            (groups[2] ? ") " + groups[2] : "") +
            (groups[3] ? "-" + groups[3] : "") +
            (groups[4] ? "-" + groups[4] : "");

        // Обрезаем лишнее (максимум 18 символов)
        if (formattedValue.length > 18) {
            formattedValue = formattedValue.slice(0, 18);
        }

        // Устанавливаем отформатированное значение
        input.value = formattedValue;
    });

    // Запрещаем ввод чего-либо, кроме цифр и "+" в начале

    inputTel.addEventListener("keydown", function (e) {
        // Разрешаем Backspace, Delete, стрелки и т.д.
        if (
            [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End",
            ].includes(e.key)
        ) {
            return;
        }

        // Разрешаем цифры и "+" только в начале
        if (
            !/\d/.test(e.key) &&
            !(e.key === "+" && this.selectionStart === 0)
        ) {
            e.preventDefault();
        }
    });

    inputName.addEventListener("input", function (e) {
        const words = e.target.value.split(" ");

        // Обрабатываем каждое слово
        const formattedWords = words.map((word) => {
            if (word.length === 0) return ""; // Пропускаем пустые слова

            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        });

        // Собираем обратно в строку
        e.target.value = formattedWords.join(" ");
    });

    modalForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.querySelector(".input__name").value.trim();
        const phone = document.querySelector(".input__tel").value.trim();
        const comment = document.querySelector("#modal__comment").value.trim();

        try {
            const response = await fetch("http://localhost:3001/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, comment }),
            });

            if (response.ok) {
                modalForm.reset();
                alert("Заявка отправлена!");
            } else {
                alert("Ошибка отправки!");
            }
        } catch (err) {
            alert("Ошибка соединения с сервером!");
        }
    });
}
