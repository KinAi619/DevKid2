export function modal() {
    const openModalButton = document.querySelector(".btn_sign_up");
    const modal = document.querySelector(".modal");
    const modalOverlay = document.querySelector(".modal_overlay");
    const inputTel = document.querySelector(".input__tel");

    openModalButton.addEventListener("click", () => {
        modal.classList.add("modal_active");
    });

    modalOverlay.addEventListener("click", () => {
        modal.classList.remove("modal_active");
    });

    inputTel.addEventListener("keydown", (event) => {
        let phoneValue = inputTel.value;

        if (event.key === "Backspace") {
            phoneValue = phoneValue.slice(0, -1);
            return;
        }

        if (!phoneValue.length && event.key !== "+" && event.key !== "8") {
            inputTel.value = "+7 (";
        } else if (
            !phoneValue.length &&
            event.key !== "+" &&
            event.key === "8"
        ) {
            inputTel.value = "+7 (";

            console.log(event.key);
        }
    });
}
