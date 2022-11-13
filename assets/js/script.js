// Create variables  
// DOM 
// show first screen hide the rest
// press button to start game 
// iniciate timer
// show second screen
// depending on the answer show corret or wrong


// Create variables

var timeLeft = 45;
var questNum;
let score = 0;
//let downloadTimer;
var timerRun = "Not Active";
console.log(timerRun);
// let time;
//var score = 0;
let yourScores;

// const highScoreMax = 100;
// let currentQuiz = 0;
//let userInitials = "";

// DOM - all the objects that i need to work with 
// const quizCtnr = document.getElementById("#quizContainer");
//var bTn = document.getElementById("startbtn");
var bTn = document.querySelector("#startbtn");
var quizContainer = document.querySelector("#quizContainer");
var button = document.querySelector(".answerBtn");
var correct = document.querySelector("#correct");
var wrong = document.querySelector("#wrong");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
var quizEnd = document.querySelector("#score");
var userInitials = document.querySelector("#inputInitials");
// const quizQ = document.getElementById("#quizquestions");
// const quizA = document.getElementById("#quizanswers");
// const countdown = document.getElementById("#countdown");
// const highScores = document.getElementById("#highScores");
// const viewHighScores = document.getElementById("#highscoresbtn");
// const correctA = document.getElementById(".correct");
// const wrongA = document.getElementById(".wrong");
var startBox = document.querySelector("#startBox");
var scoreCtn = document.querySelector("#score");
var submitScorebtn = document.querySelector("#submit");
//bTn.addEventListener("click", startTimer);

//LocalStorage Objects
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// addListener Events
bTn.addEventListener("click", gameStart);
submitScorebtn.addEventListener("click", saveScore);


function gameStart() {
quizContainer.classList.remove("gamehide");
startBox.classList.add("gamehide");
//questionFlow();
startTimer ();
questNum = 0;
while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
showQuestion(questions[questNum]);

}

function startTimer() {
    var downloadTimer = setInterval(function timerCountDown(){
  if(timeLeft <= 0 || timerRun == "Stop Timer") {
    clearInterval(downloadTimer);
    endGame();
    // show data in HTML
    document.getElementById("countdown").textContent = "Time:" + timeLeft ;
  } else {
    document.getElementById("countdown").textContent = "Time:" + timeLeft ;
    
    console.log(timerRun);
  } 
  timeLeft -= 1;
}, 1000);
// if (timeLeft <= 0) {
//     endGame();
//     console.log("Timer out");
//}
timerRun = "Active";
}

///////////////////
function showQuestion(question) {
    qElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
        
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }



  //function to collect answers
//should listen for what answer the user clicks on, compare it to the correct answer, and decrease the timer if wrong. should then run the next question function
//unless the current question is the last, then it should run the game over function
function selectAnswer(e) {
    const selectedButton = e.target;
    if (!selectedButton.dataset.correct) {
      timeLeft = timeLeft - 10;
     
      console.log(timeLeft);
      wrong.classList.remove("gamehide");
      correct.classList.add("gamehide");

    }
    if (selectedButton.dataset.correct) {
        correct.classList.remove("gamehide");
        wrong.classList.add("gamehide");
        console.log("Correct!");
    
    }


    if (questNum == questions.length - 1) {
      endGame();
    
    } else {
      clearQuestion();
      questNum++;
      showQuestion(questions[questNum]);
      console.log(score);
      //correct.classList.remove("gamehide");
    }
  }

//function to clear the current question
//should empty the HTML elements that are occupied with the currently displayed question
function clearQuestion() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }


////////////////////////////////////

function endGame() {
    timerRun = "Stop Timer";
    console.log(timerRun);
    quizContainer.classList.add("gamehide");
    quizEnd.classList.remove("gamehide");
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    yourScores = timeLeft;
    document.getElementById("yourScore").textContent = "Your final score is:" +  " " + yourScores ;
}



function saveScore() {
    const userScore = {
        score: yourScores,
        initials: userInitials.value
    };
    console.log(userScore);
    highScores.push(userScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href="highscores.html";
}

















