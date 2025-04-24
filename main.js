import { startTimer } from "./widgets/timer.js";
import { faq } from "./widgets/faq.js";
import { modal } from "./widgets/modal.js";

document.addEventListener("DOMContentLoaded", () => {
    startTimer(7200, "timer");
    faq();
    modal();
});
