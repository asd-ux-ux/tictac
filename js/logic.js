import {Statement} from './statement.js';
import {Action} from './action.js';
import {Victory} from './victory.js';

let currentState = new Statement(true);

let changeState = function(event) {

	if (event.target.className === 'place') {
		currentState.gameStarted = true;
		currentState.getState() ? currentState.changeState(false) : currentState.changeState(true);

		document.querySelector('.cross').classList.toggle('active-statement');
		document.querySelector('.circle').classList.toggle('active-statement');

		return;
	}

	if (currentState.gameStarted) return;

	let state = event.path.find(el => {
		if (el.classList != undefined) {
			if (el.classList[0] === 'cross') return el;
			if (el.classList[0] === 'circle') return el;
		}
	});

	if (state) {
		document.querySelector('.active-statement').classList.remove('active-statement');
		state.classList.add('active-statement');

		state.classList[0] === 'cross' ? currentState.changeState(true) : currentState.changeState(false);	
	}

};

let finishButton = document.querySelector('.nextRound');
let points = [[], []];

let doAction = function(event) {
	if (event.target.className != 'place') return;

	let action = new Action(event.target);

	action.makeStep(currentState.getState(), points);
	let victoryDetails = action.checkVictory(currentState.getState(), points);

	if (!( victoryDetails[0] ? victoryDetails[0] : victoryDetails ) ) return;

	let victory = new Victory(victoryDetails[2], victoryDetails[1]);
	victory.refreshGoal();
	victory.makeLine();
	victory.finish(doAction, changeState, finishButton);
	
};

let reloadRound = function(event) {
	document.querySelector('.verticalLine').style.display = 'none';

	let allSteps = document.querySelectorAll('.place > *');
	for (let step of allSteps) {
		step.remove();
	}

	points = [[], []];

	document.addEventListener('click', changeState);
	field.addEventListener('click', doAction);

	finishButton.style.display = 'none';
};

document.addEventListener('click', changeState);
field.addEventListener('click', doAction);
finishButton.addEventListener('click', reloadRound);
