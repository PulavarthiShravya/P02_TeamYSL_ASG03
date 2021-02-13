const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    //1
    question: "Which of the following shape does not have 4 sides",
    choice1: "Triangle",
    choice2: "Rectangle",
    choice3: "Sqaure",
    choice4: "Hexagon",
    answer: 1,
},

{
    //2
    question: "Which expression represents the same amount as 6 x 4?",
    choice1: "6 + 4",
    choice2: "6 x 6 x 6 x 6",
    choice3: "4 + 4 + 4 + 4 + 4 + 4",
    choice4: "6 - 4",
    answer: 3,
},

{
    //3
    question: "Which equation is incorrect?",
    choice1: "10 x 7 = 70",
    choice2: "10 + 7 = 17",
    choice3: "10 - 7 = 3",
    choice4: "10 + 7 = 18",
    answer: 4,
},

{
    //4
    question: "Sally has 5 chocolates. Mary has 3 more chocolates than Sally. How many do they have altogether?",
    choice1: "13",
    choice2: "8",
    choice3: "18",
    choice4: "2",
    answer: 1,
},

{
    //5
    question: "Which month comes after May?",
    choice1: "January",
    choice2: "June",
    choice3: "April",
    choice4: "December",
    answer: 2,
},

{
    //6
    question: "12, 35, 40, 60. What is the largest number?",
    choice1: "60",
    choice2: "12",
    choice3: "40",
    choice4: "100",
    answer: 1,
},

{
    //7
    question: "24, 28, 32, _____, 40. Fill in the blank.",
    choice1: "36",
    choice2: "44",
    choice3: "46",
    choice4: "4",
    answer: 1,
},

{
    //8
    question: "60 minutes = ____",
    choice1: "1 day",
    choice2: "3600 seconds",
    choice3: "60 seconds",
    choice4: "10 hours",
    answer: 2,
},

{
    //9
    question: "How many days are there in a week?",
    choice1: "8",
    choice2: "7",
    choice3: "6",
    choice4: "2",
    answer: 2,
},

{
    //10
    question: "You are the 2nd person from the back and 9th person from the front. How many people are there in the queue?",
    choice1: "10",
    choice2: "11",
    choice3: "12",
    choice4: "9",
    answer: 1,
},

{
    //11
    question: "Which of the following sets consists of only whole numbers?",
    choice1: "1, 1/3, 2, 2.5",
    choice2: "2.8686, 9, 10.8, 76",
    choice3: "1001, 56, 90, 49",
    choice4: "89.0999, 567, 3a, 23",
    answer: 3,
},

{
    //12
    question: "What is 1 + (2 x 3)?",
    choice1: "9",
    choice2: "7",
    choice3: "8",
    choice4: "6",
    answer: 2,
},

{
    //13
    question: "Rita has 10 chocolates. She distributes them to her 5 friends equally. How many chocolates does each of them get?",
    choice1: "2",
    choice2: "5",
    choice3: "10",
    choice4: "15",
    answer: 1,
},

{
    //14
    question: "What is 3 x 6?",
    choice1: "9",
    choice2: "36",
    choice3: "18",
    choice4: "-3",
    answer: 3,
},

{
    //15
    question: "Which number comes before 1002?",
    choice1: "1001",
    choice2: "1003",
    choice3: "No number",
    choice4: "1000",
    answer: 1,
}
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mathScore", score);
    //go to the end page
    return window.location.assign("endpageMath.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();