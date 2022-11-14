// Create variables  
// DOM 
// set up local storage JSON
//listener events
// start game
// iniciate timer
// function to run the questions and show "correct or wrong message"
//function to COLLECT answers
// removing and  hiding screens
// clear questions
// End game function
// Save Score function
// Save Score function - create new html for high scores

// Create variables
var timeLeft = 75;
var questNum;
let score = 0;
var timerRun = "Not Active";
// I need to check console to make sure what im doing 
  console.log(timerRun);
let yourScores;



// DOM - all the objects that i need to work with 

var bTn = document.querySelector("#startbtn");
var quizContainer = document.querySelector("#quizContainer");
var button = document.querySelector(".answerBtn");
var correct = document.querySelector("#correct");
var wrong = document.querySelector("#wrong");
var quizEl = document.getElementById("question");
const answerButtons = document.getElementById("answers");
var quizEnd = document.querySelector("#score");
var userInitials = document.querySelector("#inputInitials");
var startBox = document.querySelector("#startBox");
var scoreCtn = document.querySelector("#score");
var submitScorebtn = document.querySelector("#submit");


//LocalStorage Objects
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// addListener Events
bTn.addEventListener("click", gameStart);
submitScorebtn.addEventListener("click", saveScore);

// Game Starts - need to remove first screen and show question container
function gameStart() {
  quizContainer.classList.remove("gamehide");
  startBox.classList.add("gamehide");
  startTimer();
  questNum = 0;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[questNum]);

}

//  Start TIMER function
function startTimer() {
  var downloadTimer = setInterval(function timerCountDown() {
    if (timeLeft <= 0 || timerRun == "Stop Timer") {
      clearInterval(downloadTimer);
      endGame();
      document.getElementById("countdown").textContent = "Time:" + timeLeft;
    } else {
      document.getElementById("countdown").textContent = "Time:" + timeLeft;
      // console log too see what im doing
      console.log(timerRun);
    }
    timeLeft -= 1;
  }, 1000);

  timerRun = "Active";
}

// function to run the questions and show "correct or wrong message"
function showQuestion(question) {
  quizEl.innerText = question.question;
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

//function to COLLECT answers
function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timeLeft = timeLeft - 10;
    //  personal console message
    console.log(timeLeft);
    wrong.classList.remove("gamehide");
    correct.classList.add("gamehide");

  }
  // removing and  hiding screens
  if (selectedButton.dataset.correct) {
    correct.classList.remove("gamehide");
    wrong.classList.add("gamehide");
    // checking my work
    console.log("Correct!");
  }

  //  When reaches last question 
  if (questNum == questions.length - 1) {
    endGame();

  } else {
    clearQuestion();
    questNum++;
    showQuestion(questions[questNum]);
    console.log(score);

  }
}

//clear the current question function
// empty the HTML elements 
function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


// End game function
function endGame() {
  timerRun = "Stop Timer";
  console.log(timerRun);
  quizContainer.classList.add("gamehide");
  quizEnd.classList.remove("gamehide");
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  yourScores = timeLeft;
  document.getElementById("yourScore").textContent = "Your final score is:" + " " + yourScores;
}

// Save Score function - created a new html for high scores
function saveScore() {
  const userScore = {
    score: yourScores,
    initials: userInitials.value

  };
  console.log(userScore);
  // adding data to the local storage
  highScores.push(userScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
}

















