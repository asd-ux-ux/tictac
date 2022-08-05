export class Statement {
	constructor(state) {
		this.state = state;
		this.gameStarted = false;
	}

	changeState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}
};