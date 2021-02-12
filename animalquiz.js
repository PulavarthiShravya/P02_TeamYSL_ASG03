const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
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
        question: "What do you call the young of a kangaroo?",
        choice1: "Joey",
        choice2: "Calf",
        choice3: "Cub",
        choice4: "Puppy",
        answer: 1,
    },

    {
        //2
        question: "How many legs does a spider have?",
        choice1: "2",
        choice2: "4",
        choice3: "8",
        choice4: "6",
        answer: 3,
    },

    {
        //3
        question: "What animal kingdom does an ant belong to?",
        choice1: "Amphibian",
        choice2: "Reptile",
        choice3: "Mammal",
        choice4: "Insect",
        answer: 4,
    },

    {
        //4
        question: "What is the fastest land animal?",
        choice1: "Cheetah",
        choice2: "Elephant",
        choice3: "Gazelle",
        choice4: "Tiger",
        answer: 1,
    },

    {
        //5
        question: "What is the slowest animal in the world",
        choice1: "Snail",
        choice2: "Sloth",
        choice3: "Cheetah",
        choice4: "Turtle",
        answer: 2,
    },

    {
        //6
        question: "What is the biggest sea animal?",
        choice1: "Antartic Blue Whale",
        choice2: "Hammerhead Shark",
        choice3: "Great white shark",
        choice4: "Squid",
        answer: 1,
    },

    {
        //7
        question: "What do you call a baby bat?",
        choice1: "Pup",
        choice2: "Cub",
        choice3: "Kid",
        choice4: "Chick",
        answer: 1,
    },

    {
        //8
        question: "How many teeth does an adult rabbit have?",
        choice1: "2",
        choice2: "28",
        choice3: "30",
        choice4: "22",
        answer: 2,
    },

    {
        //9
        question: "What is the collective noun for a group of crows?",
        choice1: "Pack",
        choice2: "Murder",
        choice3: "Gaggle",
        choice4: "Herd",
        answer: 2,
    },

    {
        //10
        question: "What is the name of a rabbit's house?",
        choice1: "Burrow",
        choice2: "Hole",
        choice3: "Den",
        choice4: "Nest",
        answer: 1,
    },

    {
        //11
        question: "What color is the female blackbird?",
        choice1: "Black",
        choice2: "Yellow",
        choice3: "Brown",
        choice4: "Green",
        answer: 3,
    },

    {
        //12
        question: "Which marine creature is known as Hippocampus in Latin?",
        choice1: "Hippopotamus",
        choice2: "Seahorse",
        choice3: "Blue whale",
        choice4: "Dolphin",
        answer: 2,
    },

    {
        //13
        question: "A carnivorous animal eats flesh, what does a nucivorous eat?",
        choice1: "Nuts",
        choice2: "Fruits",
        choice3: "Nothing",
        choice4: "Seaweed",
        answer: 1,
    },

    {
        //14
        question: "What is a rhino's horn made out of?",
        choice1: "Bone",
        choice2: "Iron",
        choice3: "Keratin",
        choice4: "Ivory",
        answer: 3,
    },

    {
        //15
        question: "Which of these species is not extinct?",
        choice1: "Komodo Dragon",
        choice2: "Japanese sea lion",
        choice3: "Tasmanian Tiger",
        choice4: "Saudi Gazelle",
        answer: 1,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10; //total of 10 random questions will be asked

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        //go to the end page
        return window.location.assign("endpage.html");
    }
    questionCounter++;

    //update question number 
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //classes to apply

        //if answer is correct increase the score
        if(classToApply === "correct") {
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