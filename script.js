let selectedMinutes = 25;
let totalSeconds = selectedMinutes * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;
let isRunning = false;
let sessionsCompleted = 0;

const timeCards = document.querySelectorAll(".time-card");
const timerDisplay = document.getElementById("timerDisplay");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const progressCircle = document.getElementById("progressCircle");
const sessionsCount = document.getElementById("sessionsCount");

const radius = 130;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

timeCards.forEach((card) => {
  card.addEventListener("click", function () {
    if (isRunning) return;

    timeCards.forEach((c) => c.classList.remove("active"));

    this.classList.add("active");

    selectedMinutes = parseInt(this.dataset.time);
    totalSeconds = selectedMinutes * 60;
    remainingSeconds = totalSeconds;

    updateDisplay();
    updateProgress();
  });
});

function updateDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function updateProgress() {
  const progress = remainingSeconds / totalSeconds;
  const offset = circumference * (1 - progress);
  progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
  isRunning = true;
  timerLabel.textContent = "just focus";
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");

  timerInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds < 0) {
      completeSession();
      return;
    }

    updateDisplay();
    updateProgress();
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  timerLabel.textContent = "paused";
  clearInterval(timerInterval);
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  startBtn.textContent = "▶";
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  remainingSeconds = totalSeconds;
  timerLabel.textContent = "ready to focus";
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
  startBtn.textContent = "▶";
  updateDisplay();
  updateProgress();
}

function completeSession() {
  clearInterval(timerInterval);
  isRunning = false;
  sessionsCompleted++;
  sessionsCount.textContent = `🍅 ${sessionsCompleted}`;
  timerLabel.textContent = "session complete!";
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");

  alert("Sessão completa! Hora de fazer uma pausa!");

  resetTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
updateProgress();

console.log("Pomodoro Timer inicializado!");
