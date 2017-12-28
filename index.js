const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highScore = document.querySelector('.high-score');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('.timeLeft');
const holeNumber = () => Math.floor(Math.random() * holes.length);
const displayTime = (max, min) => Math.floor(Math.random() * (max - min) + min);
let lastHole;
let countdownInterval;
const gameLength = 10000;

moles.forEach((mole) => {
	mole.addEventListener('click', bonk);
});

//if there is a high score in storage, set it in the view
localStorage.getItem('highScore') == undefined ? localStorage.setItem('highScore', 0) : highScore.innerText = localStorage.highScore;

const countdown = () => {
	timeLeft.textContent = isNaN(timeLeft.textContent) ? gameLength / 1000 : timeLeft.textContent - 1;
};

const startGame = () => {
	timeUp = false;
	setTimeout(() => timeUp = true, gameLength)
	scoreBoard.textContent = 0;
	countdownInterval = setInterval(countdown, 1000);
	peep();
};

const endGame = () => {
	clearInterval(countdownInterval);

	let currentScore = parseInt(scoreBoard.innerText);
	let currentHigh = parseInt(highScore.innerText);

	//update high score
	if(currentScore > currentHigh){
		highScore.innerText = currentScore;
		localStorage.highScore = currentScore;
	}

	//reset the start button
	timeLeft.innerText = 'Start!'

};


const randomHole = () => {
	let hole = holes[holeNumber()];

	if(hole === lastHole){
		randomHole();
	}

	lastHole = hole;
	
	return hole;
};

const peep = () => {
	const time = displayTime(500, 1000);
	const hole = randomHole();

	hole.classList.add('up');
	
	setTimeout(() => {
		hole.classList.remove('up');
		if(timeUp) endGame();
		if(!timeUp) peep();
	}, time)
}

function bonk() {
	this.parentNode.classList.remove('up');
	scoreBoard.textContent = parseInt(scoreBoard.textContent) + 1
}