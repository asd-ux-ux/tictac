export class Victory {
	constructor(winner, winnedWay) {
		this.winner = winner;
		this.winnedWay = winnedWay;
	}

	refreshGoal() {
		if (this.winner) {
			let crossScore = document.querySelector('.cross .score');
			crossScore.textContent = +crossScore.textContent + 1;
		} else {
			let circleScore = document.querySelector('.circle .score');
			circleScore.textContent = +circleScore.textContent + 1;			
		}
	}

	makeLine() {
		let centerOfWay = document.querySelector(`.place[data-point='${this.winnedWay[1]}']`);
		let line = document.querySelector('.verticalLine');
		
		line.style.left = +centerOfWay.getBoundingClientRect().x + 65 + 'px';
		line.style.top = +centerOfWay.getBoundingClientRect().y - 250 + 65 + 'px';

		if (this.winnedWay[0] + 1 === this.winnedWay[1]) {
			line.style.transform = 'rotate(90deg)';
		}

		if (this.winnedWay[0] == 1 && this.winnedWay[1] == 5) {
			line.style.transform = 'rotate(135deg)';
		}

		if (this.winnedWay[0] == 3 && this.winnedWay[1] == 5) {
			line.style.transform = 'rotate(45deg)';
		}

		line.style.display = 'block';
		line.style.animationPlayState = 'running';
	}

	finish(doAction, changeState, finishButton) {
		document.removeEventListener( "click", changeState);
		field.removeEventListener( "click", doAction);
		finishButton.style.display = 'block';
	}
}
