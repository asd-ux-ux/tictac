export class Statement {
	constructor(state) {
		this.state = state;
		this.gameStarted = false;
		this.clickedPlaces = [];
	}

	changeState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}
};