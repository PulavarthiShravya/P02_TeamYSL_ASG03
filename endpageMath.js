const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mathScore');

const mathHighScore = JSON.parse(localStorage.getItem("mathHighScore")) || [];

const MAX_HIGH_MATH_SCORES = 5;
//console.log(mathHighScore);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("click me");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    mathHighScore.push(score);

    mathHighScore.sort( (a,b) => b.score - a.score)
    mathHighScore.splice(5);

    localStorage.setItem("mathHighScore", JSON.stringify(mathHighScore));
    window.location.assign("mathHP.html");
};