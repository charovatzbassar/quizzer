function shuffleOptions(arr) {
  let newArr = [];

  while (arr.length != 0) {
    let randomElement = arr[Math.floor(Math.random() * arr.length)];
    arr = arr.filter((e) => e != randomElement);
    newArr.push(randomElement);
  }

  return newArr;
}

const getQuestion = (questions) =>
  questions[Math.floor(Math.random() * questions.length)];

function loadQuestion(question) {
  // mark it as answered
  answeredQuestions.push(question);
  // assign it as current question
  currentQuestion = question;
  // enable buttons
  buttonsEnable(answerButtons);

  // update elements with question
  questionTextElement.textContent = question.questionText;
  assignAnswers(question);
}

function assignAnswers(question) {
  let answers = shuffleOptions([
    question.correctAnswer,
    ...question.incorrectAnswers,
  ]);

  answerButtons.forEach((answerButton) => {
    answerButton.textContent = answers.pop();
  });
}

function checkAnswer(answer) {
  if (answer === currentQuestion.correctAnswer) {
    resultElement.textContent = "Correct Answer!";
  } else {
    resultElement.textContent = "Incorrect answer :(";
    setTimeout(resetGame, 3000);
  }
}

function buttonsDisable(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function buttonsEnable(buttons) {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function resetGame() {
  // hide the game parts
  progressBar.classList.add("hidden");
  scoreElement.classList.add("hidden");
  questionElement.classList.add("hidden");
  // bring back the start menu elements
  titleElement.classList.remove("hidden");
  playButton.classList.remove("hidden");
  // reset global variables
  resultElement.textContent = "";
  scoreElement.textContent = 0;
  progressBar.value = 0;
  score = 0;
}

// to know when to switch difficulty
let questionNumber = 1;

// variables for scoring
let score = 0;
let seconds = 0;
let secondCounter = null;
let secondInterval = 2000;

// keeping tabs for questions
let currentQuestion = null;
let answeredQuestions = [];

const questionElement = document.querySelector("#question");
const playButton = document.querySelector("#playButton");
const progressBar = document.querySelector("#progress");
const titleElement = document.querySelector("#title");
const scoreElement = document.querySelector("#score");
const resultElement = document.querySelector("#result");

const questionTextElement = document.querySelector("#questionText");
const answerButtons = document.querySelectorAll("#answers button");
const answerElements = document
  .querySelectorAll(".answer")
  .forEach((answerButton) =>
    answerButton.addEventListener("click", function () {
      buttonsDisable(answerButtons);
      checkAnswer(answerButton.textContent);
    })
  );

playButton.addEventListener("click", () => {
  titleElement.classList.add("hidden");
  questionElement.classList.remove("hidden");
  scoreElement.classList.remove("hidden");
  progressBar.classList.remove("hidden");
  playButton.classList.add("hidden");
  loadQuestion(getQuestion(questionList.easy));
});
