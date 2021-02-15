//reference to hs list
const highScoresList = document.getElementById("highScoresList");

//get the highscores from local storage
const highScores = JSON.parse(localStorage.getItem("highScoresTech")) || [];

highScoresList.innerHTML = highScores
//map => taking an array of items and converting them into something else
.map(score => {
    return `<li class = "high-score">${score.name} - ${score.score}</li>`;
})
.join("");