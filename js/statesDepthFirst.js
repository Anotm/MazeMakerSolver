var StateMachineDepthFirst = function () {
	this.gL = [];
	this.cellQueue = [];

	this.push = function(cell) {
		this.cellQueue.push(cell);
	}

	this.pop = function() {
		return this.cellQueue.pop();
	}

	this.peek = function() {
		return this.cellQueue[this.cellQueue.length-1];
	}

	this.getGW = function() {
		return this.gW;
	}

	this.getGL = function() {
		return this.gL;
	}

	this.getDelay = function() {
		return this.delay;
	}

	this.change = function (state) {
		this.currentState = state;
		this.currentState.go();
	};

	this.start = function () {
		this.gW = $("div.gridWidth > input").val();
		this.cW = $("div.cellWidth > input").val();
		this.bW = $("div.borderWidth > input").val();
		this.delay = $("div.delay > input").val();
		this.gL = makeGrid();
		setDimentions();

		this.push(this.gL[0]);

		const max = this.gW-1;
		$("div.cell#x0y0").removeClass("topBorder");
		$("div.cell#x" + max + "y" + max).removeClass("bottomBorder");

		this.currentState = new RandConnectDF(this)
		this.currentState.go();
	}
}

var RandConnectDF = function (context) {
	this.context = context;
	this.gL = this.context.getGL();
	this.gW = this.context.getGW();

	this.sleep = function () {
	    return new Promise(resolve => setTimeout(resolve, this.context.getDelay()));
	}

	this.index = function (cell) {
		cellCoordinates = cell.getCoordinates();
		x = cellCoordinates[0];
		y = cellCoordinates[1];
		return y*this.gW + x;
	}

	this.connectPoints = function (cell1,cell2) {
		// console.log();
		// console.log("RandConnect: " + cell1.getCoordinates() + " " + cell2.getCoordinates());

		this.gL[this.index(cell1)].connect(cell2);
		this.gL[this.index(cell2)].connect(cell1);
	}

	this.go = async function () {
		// console.log("--RANDCONNECT");
		var cell = this.context.peek();
		var cellAdj = cell.getRandAdjacent();

		while (cellAdj != null) {

			this.connectPoints(cell,cellAdj);
			cell = cellAdj;
			cellAdj = cell.getRandAdjacent();
			this.context.push(cell);

			if (this.context.getDelay() != 0) { await this.sleep(); }
		}
		context.change(new BackTrackDF(context));
	}
}

var BackTrackDF = function (context) {
	this.context = context;
	this.gW = this.context.getGW();
	this.gL = this.context.getGL();

	this.go = function () {
		// console.log("--SEARCH");
		var hit = true;
		var cell = this.context.peek();

		while (cell.getRandAdjacent() == null) {
			// console.log(cell.getCoordinates());
			// console.log("--" + cell.getRandAdjacent());
			if (cell.getCoordinates()[0] == 0 && cell.getCoordinates()[1] == 0) {
				hit = false;
				break;
			}
			var dumpCell = this.context.pop();
			cell = this.context.peek();
		}

		if (hit) {
			context.change(new RandConnectDF(context));
		} else {
			// console.log("Search: All cells populated");
			enableSolveButtons();
		}
	}
}

function runDepthFirst() {
	disableSolveButtons();
	var state = new StateMachineDepthFirst();
	state.start();
}