const mathHighScoreList = document.getElementById("mathHighScoreList");
const mathHighScore = JSON.parse(localStorage.getItem("mathHighScore")) || [];

mathHighScoreList.innerHTML = mathHighScore
.map( score => {
    return `<li class = "high-score" >${score.name} - ${score.score}</li>`;
})
.join("");
