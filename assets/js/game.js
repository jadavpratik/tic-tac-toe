const parent = document.querySelector('.parent');
const child = document.querySelectorAll('.child');
const restartButton = document.querySelectorAll('.restart-btn');
const gameOverTemplate = document.querySelector('.game-over');
const gameWinnerTemplate = document.querySelector('.game-won');
const FIRST_PLAYER_SYMBOL = prompt('Enter First Player Symbol');
const SECOND_PLAYER_SYMBOL = prompt('Enter Second Player Symbol');
const WINNER = { PLAYER: null, SYMBOL: '' };
const PLAYER = { FIRST: 1, SECOND: 2, ACTIVE: 1, };
const GAME_OVER_COUNT = 9;
const MATCH = {
	HORIZONTAL: [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	],
	VERTICAL: [
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9]
	],
	CROSS: [
		[1, 5, 9],
		[3, 5, 7],
	]
};
let clickCount = 0;

// Click Function For Every Boxes.
for (box of child) {
	box.addEventListener('click', function () {
		// if box have text means, it's already clicked/filled by player!
		if (this.innerText !== '') return;

		clickCount++;

		// Whose turn is coming?
		this.innerText = PLAYER.ACTIVE === PLAYER.FIRST ? FIRST_PLAYER_SYMBOL : SECOND_PLAYER_SYMBOL;
		PLAYER.ACTIVE = PLAYER.ACTIVE === PLAYER.FIRST ? PLAYER.SECOND : PLAYER.FIRST;

		// On each click we check that which player is winner?
		whoIsWinner();
	});
}

function whoIsWinner() {
	console.log(clickCount);
	if (clickCount === GAME_OVER_COUNT && WINNER.PLAYER === null) {
		return gameOver();

	} else {
		const winner = checkWinningCriteria() || null;
		if (winner) endGameCss(winner);
	}
}

function checkWinningCriteria() {
	for (criteriaType in MATCH) {
		for (criteria of MATCH[criteriaType]) {
			const result = isCriteriaMatch(criteria);
			if (result) return result;
		}
	}
}

function isCriteriaMatch(criteria) {
	// pick the any three box according to criteria numbers...
	const box1Text = child[criteria[0] - 1].innerText;
	const box2Text = child[criteria[1] - 1].innerText;
	const box3Text = child[criteria[2] - 1].innerText;
	if ((box1Text === box2Text) && (box2Text === box3Text)) {
		if (box1Text !== '') {
			console.log(criteria, box1Text);
			return { criteria, symbol: box1Text };
		}
	}
}

function endGameCss({ criteria, symbol }) {
	child[criteria[0] - 1].style = 'background-color: black; color: white';
	child[criteria[1] - 1].style = 'background-color: black; color: white';
	child[criteria[2] - 1].style = 'background-color: black; color: white';
	WINNER.SYMBOL === symbol;
	parent.innerHTML = '';
	gameWinnerTemplate.classList.remove('d-none');
	document.querySelector('.winner_player').innerText = WINNER.SYMBOL;
}

function gameOver() {
	parent.innerHTML = '';
	gameOverTemplate.classList.remove('d-none');
}

// Restart Button for Reload the Game...
for (btn of restartButton) {
	btn.addEventListener('click', () => location.reload());
}
