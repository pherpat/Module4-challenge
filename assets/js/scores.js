


function getHighScores() {

    // grab JSON object and convert to js object
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // log the array to make sure is there
    console.log(highScores);

    //  sorting the array 
	let sortedPlayers = (highScores) => {
		return highScores.sort((a, b) => {
			return b.score - a.score;
		});
	}
	console.log(sortedPlayers(highScores))

    // taking our object array and maping it to out HTML items
     document.querySelector("#scorelist").innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.initials}`)
    .join('');
    
}

getHighScores();