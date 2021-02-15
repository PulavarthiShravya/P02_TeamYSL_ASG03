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
        question: "What is the name of the capital of Turkey?",
        choice1: "Istanbul",
        choice2: "Izmir",
        choice3: "Ankara",
        choice4: "Bursa",
        answer: 3,
    },  

    {
        //2
        question: "On which continent is the country of Angola located?",
        choice1: "Europe",
        choice2: "Australia",
        choice3: "South America",
        choice4: "Africa",
        answer: 4,
    },

    {
        //3
        question: "The World Health Organization headquarters is located in which European country?",
        choice1: "Switzerland",
        choice2: "Italy",
        choice3: "France",
        choice4: "Belgium",
        answer: 1,
    },

    {
        //4
        question: "What is the capital of the US state Nevada?",
        choice1: "Las Vegas",
        choice2: "Carson City",
        choice3: "Reno",
        choice4: "Henderson",
        answer: 2,
    },

    {
        //5
        question: "What event led to Liechenstein adding a crown to its flag?",
        choice1: "Coronation of Prince Johann I Joseph in 1805",
        choice2: "Charles VI's decree in 1719",
        choice3: "The 1936 Olympics",
        choice4: "Signing of the 1862 Constitution of Liechtenstein",
        answer: 3,

    },

    {
        //6
        question: "Where are the Nazca Lines located?",
        choice1: "Brazil",
        choice2: "Colombia",
        choice3: "Ecuador",
        choice4: "Peru",
        answer: 4,
    },

    {
        //7
        question: "What is the right way to spell the capital of Hungary?",
        choice1: "Budapest",
        choice2: "Boodapest",
        choice3: "Bhudapest",
        choice4: "Budapast",
        answer: 1,
    },

    {
        //8
        question: "What is the busiest port in Europe?",
        choice1: "Port of Antwerp",
        choice2: "Port of Rotterdam",
        choice3: "Port of Hamburg",
        choice4: "Port of Amsterdam",
        answer: 2,
    },

    {
        //9
        question: "What is the tallest mountain in the world?",
        choice1: "Mount Godwin Austen",
        choice2: "Mount Kilimajaro",
        choice3: "Mount Everest",
        choice4: "Annapurna",
        answer: 3,
    },

    {
        //10
        question: "Which city has the busiest airport in the world?",
        choice1: "London, England",
        choice2: "Singapore, Singapore",
        choice3: "Tokyo, Japan",
        choice4: "Atlanta, Georgia USA",
        answer: 4,
    },

    {
        //11
        question: "Where is the Sonoran Desert located?",
        choice1: "North America",
        choice2: "Asia",
        choice3: "South America",
        choice4: "Africa",
        answer: 1,
    },

    {
        //12
        question: "Which of these countries is not a United Nations member state?",
        choice1: "Tuvalu",
        choice2: "Niue",
        choice3: "Montenegro",
        choice4: "South Sudan",
        answer: 2,
    },

    {
        //13
        question: "What is the capital of greenland?",
        choice1: "Sisimiut",
        choice2: "Nuuk",
        choice3: "Narsaq",
        choice4: "Maniitsoq",
        answer: 2,
    },

    {
        //14
        question: "Which European city has the highest mileage of canals in the world",
        choice1: "Birmingham",
        choice2: "Berlin",
        choice3: "Venice",
        choice4: "Amsterdam",
        answer: 1,
    },

    {
        //15
        question: "Which country inside the United Kingdom does NOT appear on its flag, the Union Jack?",
        choice1: "Isle of Wight",
        choice2: "Ireland",
        choice3: "Wales",
        choice4: "Scotland",
        answer:3,
    }
]

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
        localStorage.setItem('geogScore', score)
        //go to the end page
        return window.location.assign("endpageGeog.html");
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