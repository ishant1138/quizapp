const questions = [
  {
    question: "What is the full form of AI?",
    answers: [
      { text: "Artificially Intelligent", correct: false },
      { text: "Advance Intelligence", correct: false },
      { text: "Artificial Intelligence", correct: true },
      { text: "Artificially Intelligent", correct: false },
    ],
  },
  {
    question:
      "In CSS which of the following pseudo-classes select the first child element of its parent?",
    answers: [
      { text: "nth-child", correct: false },
      { text: "first-child", correct: true },
      { text: "first", correct: false },
      { text: "child(1)", correct: false },
    ],
  },
  {
    question: "What is the output of 5 + '5' in JavaScript?",
    answers: [
      { text: "10", correct: false },
      { text: "55", correct: true },
      { text: "undefined", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "What is the full form of HTML?",
    answers: [
      { text: "hyper text markup language", correct: true },
      { text: "hyper task markup language", correct: false },
      { text: "hyper test markup language", correct: false },
      { text: "hyper text manipulation language", correct: false },
    ],
  },
  {
    question: "What is the correct way of declaring a pointer in C++?",
    answers: [
      { text: "int *ptr", correct: true },
      { text: "int ptr", correct: false },
      { text: "int &ptr", correct: false },
      { text: "ptr", correct: false },
    ],
  },
  {
    question:
      "Which JavaScript function is used to select an HTML element by ID?",
    answers: [
      { text: "getElementByClass()", correct: false },
      { text: "getElementById()", correct: true },
      { text: "querySelectorAll()", correct: false },
      { text: "querySelectorByTag()", correct: false },
    ],
  },
  {
    question: "What does the Bayesian Network provide?",
    answers: [
      { text: "Partial description of the domain", correct: false },
      { text: "Complete description of the problem", correct: false },
      { text: "Complete description of the domain", correct: true },
      { text: "None of the mentioned", correct: false },
    ],
  },
  {
    question: "What is the function of an AI agent?",
    answers: [
      { text: "Mapping of goal sequence to an action", correct: false },
      {
        text: "Work without the direct interference of the people",
        correct: false,
      },
      { text: "Mapping of percept sequence to an action", correct: true },
      { text: "Mapping of environment sequence to an action", correct: false },
    ],
  },
  {
    question:
      "Total number of informed search methods in Artificial Intelligence?",
    answers: [
      { text: "4", correct: true },
      { text: "3", correct: false },
      { text: "2", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "What will be the output of console.log(typeof [])?",
    answers: [
      { text: "array", correct: false },
      { text: "object", correct: true },
      { text: "null", correct: false },
      { text: "undefined", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

const startPage = document.getElementById("start-page");
const quizContainer = document.querySelector(".quiz-container");
const scorePage = document.getElementById("score-page");
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const confettiCanvas = document.getElementById("confetti");

function startQuiz() {
  startPage.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  showQuestion(questions[currentQuestionIndex]);
  updateProgressBar();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(answer) {
  const buttons = answerButtonsElement.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.disabled = true; // Disable buttons after selection
    if (button.innerText === answer.text) {
      button.classList.add(answer.correct ? "correct" : "incorrect");
    }
  });
  if (answer.correct) {
    score++;
  }
  nextButton.classList.remove("hidden");
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add("hidden");
    updateProgressBar();
  } else {
    endQuiz();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function endQuiz() {
  quizContainer.classList.add("hidden");
  scorePage.classList.remove("hidden");
  finalScoreElement.innerText = `${score} / ${questions.length}`;
  startConfetti();
}

function restartQuiz() {
  scorePage.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
  startQuiz();
}

function startConfetti() {
  const confettiSettings = { target: confettiCanvas, max: 150 };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);
