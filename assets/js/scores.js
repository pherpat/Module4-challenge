
// Function HighScores 
function getHighScores() {

    // grab JSON object and convert to js object
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // log the array to make sure its there
    console.log(highScores);

    //  sorting the array 
	let sortedPlayers = (highScores) => {
		return highScores.sort((a, b) => {
			return b.score - a.score;
		});
	}
    
	// console.log(sortedPlayers(highScores))

    // taking our object array and maping it to out HTML items
     document.querySelector("#scorelist").innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.initials}`)
    .join('');
    
}
//  calling the function
getHighScores();

//  Creating  New Varibles
var goBackbtn = document.querySelector(".gobackBtn");

// add listener event
goBackbtn.addEventListener("click", startOver);

//  calling the start over function
function startOver () {
    window.location.href="index.html";
}

// create variable for clear high scores
var clearHscores = document.querySelector(".clearHs");
clearHscores.addEventListener("click", clearScore);

// calling the clearscores function, clear the local storage, and reload page.
 function clearScore () {
    console.log("clear");
    localStorage.clear();
    location.reload();
}
 
