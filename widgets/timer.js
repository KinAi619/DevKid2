export function startTimer(duration, displayElementId) {
    let timeLeft = duration;
    const timerElement = document.getElementById(displayElementId);

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0"),
        ].join(":");
    }

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00";
        }
    }, 1000);
}
