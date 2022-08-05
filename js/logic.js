import {Statement} from 'js/statement.js';
import {Action} from 'js/action.js';
import {Victory} from 'js/victory.js';

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
	victory.finish(doAction, changeState);
	
};

document.addEventListener('click', changeState);
field.addEventListener('click', doAction);
