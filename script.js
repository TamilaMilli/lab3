const turn = document.querySelector('#turn');
const cells = document.querySelectorAll('#cell');
const winnerField = document.querySelector('#winnerField');
const winnerTitle = document.querySelector('#winnerTitle');
const button = document.querySelector('#button');

let winner = null;

window.addEventListener('click', (event) => {	
	if(event.target.classList.contains('cell') && !event.target.classList.contains('active')) {
		event.target.textContent = 'X';
		event.target.classList.add('active');
		if(checkField()) {
			getWinner();
			return;
		};

		turn.textContent = '0 turn';

		setTimeout(() => {
			botTurn();
			if(checkField()) {
				getWinner();
				return
			};
		}, 1000)
	}
});

button.addEventListener('click', () => {
	location.reload();
});

function getWinner() {
	setTimeout(() => {
		winnerTitle.textContent = `Winner ${winner} Player`;
		winnerField.classList.remove('hidden');
	}, 250);
}

function checkField() {
	const combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let combination of combinations) {
		if (
			cells[combination[0]].textContent == cells[combination[1]].textContent &&
			cells[combination[1]].textContent == cells[combination[2]].textContent &&
			cells[combination[0]].textContent != '') {
				winner = cells[combination[0]].textContent;
				return true
		};
	}

	const emptyCells = document.querySelectorAll('#cell:not(.active)');
	if(emptyCells.length === 0 && winner === null) {
		winnerTitle.textContent = 'Draw';
		winnerField.classList.remove('hidden');
	}

	return false;
}

function botTurn() {
	let emptyCells = document.querySelectorAll('#cell:not(.active)');
	if(emptyCells.length > 0) {
			let element = getRandomNumbert(emptyCells.length);
			emptyCells[element].classList.add('active');
			emptyCells[element].textContent = '0';

			turn.textContent = 'X turn';
	}	
}

function getRandomNumbert(max) {
	return Math.floor(Math.random() * max);
}
