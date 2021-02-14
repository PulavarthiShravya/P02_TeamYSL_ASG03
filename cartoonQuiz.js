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
        question: "Which of the following is not a Disney Character?",
        choice1: "Daffy Duck",
        choice2: "Donald Duck",
        choice3: "Goofy",
        choice4: "Daisy Duck",
        answer: 1,
    },

    {
        //2
        question: "In the movie 'Toy Story', what was the name of the child that owned the toys?",
        choice1: "Tommy",
        choice2: "Edward",
        choice3: "Jenny",
        choice4: "Andy",
        answer: 4,
    },

    {
        //3
        question: "What is the name of the villain in the movie Lion King?",
        choice1: "Vada",
        choice2: "Jafarr",
        choice3: "Scar",
        choice4: "Fred",
        answer: 3,
    },

    {
        //4
        question: "What is the name of SpongeBob's pet?",
        choice1: "Snail",
        choice2: "Gary",
        choice3: "Patrick",
        choice4: "Lary",
        answer: 2,
    },

    {
        //5
        question: "Who lives in the pineapple under the sea?",
        choice1: "Spongebob Squarepants",
        choice2: "Patrick Star",
        choice3: "Squidward",
        choice4: "Mr Krabs",
        answer: 1,
    },

    {
        //6
        question: "What is Everest's favorite food from the cartoon paw patrol?",
        choice1: "Liver",
        choice2: "Chicken",
        choice3: "Steak",
        choice4: "Caribou",
        answer: 1,
    },

    {
        //7
        question: "It's the Mickeymouse _____________, come inside have fun inside... Fill in the blank.",
        choice1: "Fun house",
        choice2: "Clubhouse",
        choice3: "House",
        choice4: "Playhouse",
        answer: 2,
    },

    {
        //8
        question: "What is the color of the cat(Tom) in Tom & Jerry",
        choice1: "Grey",
        choice2: "Black",
        choice3: "Pink",
        choice4: "Yellow",
        answer: 1,
    },

    {
        //9
        question: "What is the name of Sofia's father from the cartoon 'Sofia the first'?",
        choice1: "King Ronald the Second",
        choice2: "King Roland the First",
        choice3: "King Ronald the First",
        choice4: "King Roland the Second",
        answer: 1,
    },

    {
        //10
        question: "Who is the fairy in the cartoon Jake and the NeverLand pirates?",
        choice1: "Izzy",
        choice2: "Jake",
        choice3: "Scully",
        choice4: "Hitchcock",
        answer: 1,
    },

    {
        //11
        question: "What color is Sofia's gown from Sofia the first?",
        choice1: "Blue",
        choice2: "Purple",
        choice3: "White",
        choice4: "Pink",
        answer: 2,
    },

    {
        //12
        question: "What is the name of the rabbit from the cartoon 'Dibo the gift dragon'",
        choice1: "Pinky",
        choice2: "Bun Bun",
        choice3: "Bunny",
        choice4: "Wilbur",
        answer: 3,
    },

    {
        //13
        question: "What is the name of Dora's cousin?",
        choice1: "Diego",
        choice2: "Boots",
        choice3: "Map",
        choice4: "Amy Santiago",
        answer: 1,
    },

    {
        //14
        question: "What is the name of the zebra from the cartoon Peppa Pig?",
        choice1: "Zoey Zebra",
        choice2: "George",
        choice3: "Susie Sheep",
        choice4: "Rebbecca Rabbit",
        answer: 1,
    },

    {
        //15
        question: "What is the name of the villain from the movie 'The little mermaid (1989)'?",
        choice1: "Jafarr",
        choice2: "Ursula",
        choice3: "Sebastian",
        choice4: "Ariel",
        answer: 2,
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
        localStorage.setItem('cartoonScore', score)
        //go to the end page
        return window.location.assign("endpageCartoon.html");
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