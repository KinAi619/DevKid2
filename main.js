import { startTimer } from "./widgets/timer.js";
import { faq } from "./widgets/faq.js";

document.addEventListener("DOMContentLoaded", () => {
    startTimer(7200, "timer");
    faq();
});
