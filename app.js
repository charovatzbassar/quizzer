function shuffleOptions(arr) {
  let newArr = [];

  while (arr.length != 0) {
    let randomElement = arr[Math.floor(Math.random() * arr.length)];
    arr = arr.filter((e) => e != randomElement);
    newArr.push(randomElement);
  }

  return newArr;
}

function getCurrentQuestion() {}

function loadQuestion() {}

function assignAnswers() {}

function buttonToggle() {}

const checkIfLastQuestion = () => "";

function resetGame() {
  progressBar.classList.add("hidden");
  scoreElement.classList.add("hidden");
  questionElement.classList.add("hidden");
  playButton.classList.remove("hidden");
  result.textContent = "";
  scoreElement.textContent = 0;
  titleElement.classList.remove("hidden");
  progressBar.value = 0;
  score = 0;
}

let score = 0;
let seconds = 0;
let secondCounter = null;
let secondInterval = 2000;

const questionElement = document.querySelector("#question");
const playButton = document.querySelector("#playButton");
const progressBar = document.querySelector("#progress");
const titleElement = document.querySelector("#title");
const scoreElement = document.querySelector("#score");
const resultElement = document.querySelector("#result");

playButton.addEventListener("click", () => {
  questionElement.classList.remove("hidden");
  playButton.classList.add("hidden");
  scoreElement.classList.remove("hidden");
  titleElement.classList.add("hidden");
  progressBar.classList.remove("hidden");
  loadQuestion();
});
