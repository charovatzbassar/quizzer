function shuffleOptions(arr) {
  let newArr = [];

  while (arr.length != 0) {
    let randomElement = arr[Math.floor(Math.random() * arr.length)];
    arr = arr.filter((e) => e != randomElement);
    newArr.push(randomElement);
  }

  return newArr;
}

function switchDifficulty() {
  if (questionNumber <= 5) {
    currentQuestionDifficulty = questionList.easy;
  } else if (questionNumber <= 10) {
    currentQuestionDifficulty = questionList.medium;
  } else if (questionNumber <= 15) {
    currentQuestionDifficulty = questionList.hard;
  }
}

function getDifficulty() {
  if (questionNumber <= 5) {
    return "easy";
  } else if (questionNumber <= 10) {
    return "medium";
  } else if (questionNumber <= 15) {
    return "hard";
  }
}

function addScore() {
  let difficulty = getDifficulty();

  if (difficulty === "easy") {
    score += 10 - penalty;
    progressBar.value += 10 - penalty;
  } else if (difficulty === "medium") {
    score += 20 - penalty * 2;
    progressBar.value += 20 - penalty * 2;
  } else if (difficulty === "hard") {
    score += 30 - penalty * 3;
    progressBar.value += 30 - penalty * 3;
  }
  scoreElement.textContent = score;
}

function getQuestion(questions) {
  while (true) {
    let pickedQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    if (!answeredQuestions.includes(pickedQuestion)) {
      return pickedQuestion;
    }
  }
}

function loadQuestion(question) {
  // mark it as chosen
  answeredQuestions.push(question);
  // assign it as current question
  currentQuestion = question;
  // enable buttons
  buttonsEnable(answerButtons);

  // update elements with question
  questionTextElement.textContent = question.questionText;
  assignAnswers(question);
  resultElement.textContent = "";
  // count seconds for scores
  penaltyCounter = setInterval(() => {
    penalty++;
  }, penaltyInterval);
}

function assignAnswers(question) {
  let answers = shuffleOptions([
    question.correctAnswer,
    ...question.incorrectAnswers,
  ]);
  // assign to buttons
  answerButtons.forEach((answerButton) => {
    answerButton.textContent = answers.pop();
  });
}

function checkAnswer(answer) {
  // if it is not the last question
  if (questionNumber < 15) {
    if (answer === currentQuestion.correctAnswer) {
      resultElement.textContent = "Correct Answer!";
      addScore();
      questionNumber++;
      switchDifficulty();
      setTimeout(
        () => loadQuestion(getQuestion(currentQuestionDifficulty)),
        3000
      );
    } else {
      resultElement.textContent = "Incorrect answer :(";
      setTimeout(resetGame, 3000);
    }
  } else {
    addScore();
    resultElement.textContent = "Correct Answer! Thanks for playing!";
    setTimeout(resetGame, 3000);
  }
  // clear penalty counter
  penalty = 0;
  clearInterval(penaltyCounter);
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
  // reset score
  resultElement.textContent = "";
  scoreElement.textContent = 0;
  progressBar.value = 0;
  score = 0;
  // question variables
  answeredQuestions = [];
  currentQuestion = null;
  currentQuestionDifficulty = null;
  questionNumber = 1;
}

// to know when to switch difficulty
let currentQuestionDifficulty = null;
let questionNumber = 1;

// variables for scoring
let score = 0;
let penalty = 0;
let penaltyCounter = null;
let penaltyInterval = 2000;

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
  switchDifficulty();
  loadQuestion(getQuestion(currentQuestionDifficulty));
});
