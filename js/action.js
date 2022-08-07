export class Action {
	constructor(target) {
		this.target = target;

		this.cross = document.createElement('div');
		this.cross.classList.add('cross-symbol');
		this.cross.append(document.createElement('span'), document.createElement('span'));

		this.circle = document.createElement('div');
		this.circle.classList.add('circle-symbol');
		this.circle.append(document.createElement('span'));
	}

	makeStep(state, points) {
		if (state) {
			if (this.target.firstElementChild) return;

			this.target.append(this.cross);
			points[0].push(+this.target.dataset.point);
		} else {
			if (this.target.firstElementChild) return;
			
			this.target.append(this.circle);
			points[1].push(+this.target.dataset.point);
		}
	}

	checkVictory(state, points) {
		let waysToVictory = [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [1, 5, 9], [7, 8, 9], [3, 5, 7]];
		let winnedWay;
		let checkDraw = 0;
		let victory = false;

		if (state) {
			
			for (let way of waysToVictory) {
				let amountOfCorrect = 0;
				
				for (let num of way) {
					if (points[0].indexOf(num) >= 0) {
						amountOfCorrect++;
					}
				}
				
				if (amountOfCorrect === 3) {
					victory = true;
					winnedWay = way;
					break;
				}
			}

			if (victory) {
				return [victory, winnedWay, true];
			}

		} else {

			for (let way of waysToVictory) {
				let amountOfCorrect = 0;
				
				for (let num of way) {
					if (points[1].indexOf(num) >= 0) {
						amountOfCorrect++;
					}
				}
				
				if (amountOfCorrect === 3) {
					victory = true;
					winnedWay = way;
					break;
				}
			}

			if (victory) {
				return [victory, winnedWay, false];
			}
			
		}

		for (let place of document.querySelectorAll('.place')) {
			if (place.firstElementChild) checkDraw++;
		}

		if (checkDraw === 9) return ['draw'];

		return victory;
	}
};