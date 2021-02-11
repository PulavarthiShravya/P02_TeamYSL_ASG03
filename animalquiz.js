const question = document.getElementById("question"); //get the question 
const choices = Array.from(document.getElementsByClassName("choice-text")); //get the choice 

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};


//to-do 
//check if answers are correct or not
//display progress bar
//use the open API
//local storage for high score display