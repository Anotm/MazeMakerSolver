var StateMachineHuntKill = function () {
	this.gL = [];
	this.currentIndex;
	this.currentState;

	this.setCurrentIndex = function(i) {
		this.currentIndex = i;
	}

	this.getCurrentIndex = function() {
		return this.currentIndex;
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
		this.currentIndex = 0;
		this.gW = $("div.gridWidth > input").val();
		this.cW = $("div.cellWidth > input").val();
		this.bW = $("div.borderWidth > input").val();
		this.delay = $("div.delay > input").val();
		this.gL = makeGrid();
		setDimentions();

		const max = this.gW-1;
		$("div.cell#x0y0").removeClass("topBorder");
		$("div.cell#x" + max + "y" + max).removeClass("bottomBorder");

		this.currentState = new SearchHK(this)
		this.currentState.go();
	}
}

var SearchHK = function (context) {
	this.context = context;
	this.gW = this.context.getGW();
	this.gL = this.context.getGL();
	this.currentIndex = this.context.getCurrentIndex();

	// this.hasNonActive = function (x,y) {
	// 	cell = this.gL[context];
	// }

	this.go = async function () {
		// console.log("--SEARCH");
		var hit = false;

		for (this.currentIndex; this.currentIndex < this.gW ** 2; this.currentIndex++) {
			const cell = this.gL[this.currentIndex];
			
			if (cell.isActive() && (cell.getRandAdjacent() != null)) {
				hit = true;
				context.setCurrentIndex(this.currentIndex);
				break;
			}

			setCurrentCell(cell);
			if (this.context.getDelay() != 0) { await sleep(this.context.getDelay()); }
			removeCurrentCell(cell);
		}

		if (hit) {
			context.change(new RandConnectHK(context));
		} else {
			// console.log("Search: All cells populated");
			setGridList(this.gL);
			enableGenButtons();
			enableSolveButtons();
		}
	}
}

var RandConnectHK = function (context) {
	this.context = context;
	this.gL = this.context.getGL();
	this.gW = this.context.getGW();
	this.currentIndex = this.context.getCurrentIndex();

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
		var cell = this.gL[this.currentIndex];
		var cellAdj = cell.getRandAdjacent();
		while (cellAdj != null) {

			this.connectPoints(cell,cellAdj);
			cell = cellAdj;
			cellAdj = cell.getRandAdjacent();

			setCurrentCell(cell);
			if (this.context.getDelay() != 0) { await sleep(this.context.getDelay()); }
			removeCurrentCell(cell);
		}
		context.change(new SearchHK(context));
	}
}

function runHuntKill() {
	disableGenButtons();
	disableSolveButtons();
	var state = new StateMachineHuntKill();
	state.start();
}