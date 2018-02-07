// This is the array of word choices for the computer to pick from.
var computerChoices = ["PRINCESS", "ARIEL", "AURORA", "BELL", "REPUNZEL", "ELSA", "ANNA", "MERIDA", "CINDERELLA", "DRESS", "JASMINE", "ALADDIN", "FROZEN", "BRAVE", "TIANA"]

var letterChoices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// Object that holds user's stats and guessed letters array.
var userStats = {
	wins: 0,
	losses: 0,
	guessesLeft: 12,
	guessedLettersArr: [],
	answerArray: [],
	difficulty: 'easy',
}

// unassigned variables to pull the value once they are generated in the keyup event. This are later used in the fuctions below.
var computerWord;
var userGuess;
var joinedArray;

// fuction that will take guess entry and add it to array to show on HTML page of guesses so far.
function addGuess(userGuess) {
	userStats.guessedLettersArr.push(userGuess);
	console.log('guesses:', userStats.guessedLettersArr);
	document.querySelector("#guessesSoFar").innerHTML = "Your Guesses So Far: " + userStats.guessedLettersArr.join(", ");
}

// Game reset to be used when user wins or losses.
function hangmanReset() {
	userStats.guessesLeft = 12;
	document.querySelector("#guessesLeft").innerHTML = "Guesses Left: " + userStats.guessesLeft;
	userStats.guessedLettersArr = [];
	document.querySelector("#guessesSoFar").innerHTML = "Your Guesses So Far: " + userStats.guessedLettersArr;
	randomWord();
}

// Randomly chooses a choice from the options array. This is the Computer's guess.
function randomWord() {
	computerWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

function blankWord() {
	for (var i = 0; i < computerWord.length; i++) {
		userStats.answerArray[i] = "_";
	}
	joinedArray = userStats.answerArray.join(" ");
	document.querySelector("#currentWord").innerHTML = joinedArray;
}

function letterGuess() {
	// var userGuess = event.key.toUpperCase();

	for (var i = 0; i < computerWord.length; i++) {
		console.log('does the letter match: ' + computerWord[i] === userGuess);
		if (computerWord[i] === userGuess) {
			userStats.answerArray[i] = userGuess;
		}
	}
	document.querySelector("#currentWord").innerHTML = userStats.answerArray.join(" ");
}

//GAME STARTS TO RUN HERE

// Run the fuction to determine the random letter for the computer.
hangmanReset();
blankWord();
console.log(computerWord);
console.log(joinedArray);

// Once key is pressed, it will start the function.
document.onkeyup = function (event) {

	// Determines which key was pressed.
	var userGuess = event.key.toUpperCase();
	console.log(userGuess);
	console.log('capital letter =' + letterChoices.includes(userGuess));
	console.log('Is it a letter: ' + letterChoices.includes(userGuess));
	console.log('Is it in the word: ' + computerWord.includes(userGuess));

	if (letterChoices.includes(userGuess)) {
		if (computerWord.includes(userGuess)) {
			for (var i = 0; i < computerWord.length; i++) {
				console.log('does the letter match: ' + computerWord[i] === userGuess);
				if (computerWord[i] === userGuess) {
					userStats.answerArray[i] = userGuess;
				}
			}
			document.querySelector("#currentWord").innerHTML = userStats.answerArray.join(" ");
		}
		else {
			userStats.guessesLeft--;
			document.querySelector("#guessesLeft").innerHTML = "Guesses Left: " + userStats.guessesLeft;
		}
	}

}

