const startBtn = document.getElementById("startBtn");
const durationSelect = document.getElementById("duration");
const circle = document.getElementById("circle");
const text = document.getElementById("text");
const countdownEl = document.getElementById("countdown");
const themeToggle = document.getElementById("themeToggle");

let interval;
let countdownTimer;
let phases = ["Einatmen", "Anhalten", "Ausatmen"];
let phaseIndex = 0;

startBtn.addEventListener("click", () => {
  const totalMinutes = parseInt(durationSelect.value);
  const totalSeconds = totalMinutes * 60;
  let secondsPassed = 0;

  text.textContent = "Bereite dich vor...";
  updateCountdown(totalSeconds);

  clearInterval(interval);
  clearInterval(countdownTimer);

  let secondsLeft = totalSeconds;

  countdownTimer = setInterval(() => {
    secondsLeft--;
    updateCountdown(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);

  setTimeout(() => {
    animatePhase();
    interval = setInterval(() => {
      secondsPassed += 4;

      if (secondsPassed >= totalSeconds) {
        clearInterval(interval);
        clearInterval(countdownTimer);
        text.textContent = "Glückwunsch 🎉";
        circle.style.transform = "scale(1)";
        countdownEl.textContent = "Übung abgeschlossen ✔️";
        return;
      }

      animatePhase();
    }, 4000);
  }, 2000);
});

function animatePhase() {
  const phase = phases[phaseIndex % phases.length];
  text.textContent = phase;

  if (phase === "Einatmen") {
    circle.style.transform = "scale(1.4)";
  } else if (phase === "Ausatmen") {
    circle.style.transform = "scale(1)";
  }

  phaseIndex++;
}

function updateCountdown(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  countdownEl.textContent = `Verbleibende Zeit: ${min}:${sec}`;
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
