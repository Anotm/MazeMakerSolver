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

	// this.setDimentions = function() {
	// 	$("div.grid").css({"--grid-w":this.gW, "--cell-w":this.cW+"px", "--border-w":this.bW+"px"});
	// }

	// this.makeGrid = function() {
	// 	// x = column
	// 	// y = row
	// 	var gridList = [];
	// 	$("div.grid").empty();
	// 	for (var i = 0; i < this.gW ** 2; i++) {
	// 		const x = i%this.gW;
	// 		const y = Math.floor(i/this.gW);
	// 		// $("div.grid").append('<div class="cell" id="x' + x + 'y' + y + '"></div>');
	// 		$("div.grid").append('<div class="cell rightBorder leftBorder topBorder bottomBorder" id="x' + x + 'y' + y + '" onclick="select(this.id)"></div>');
	// 		gridList.push(new Cell(x,y,this.gW));
	// 	}
	// 	for (var i = 0; i < this.gW ** 2; i++) {
	// 		// console.log(i);
	// 		gridList[i].setAdjacent(gridList);
	// 	}
	// 	gridList[0].setActive(true);
	// 	return gridList;
	// }

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

		this.currentState = new Search(this)
		this.currentState.go();
	}
}

var Search = function (context) {
	this.context = context;
	this.gW = this.context.getGW();
	this.gL = this.context.getGL();
	this.currentIndex = this.context.getCurrentIndex();

	// this.hasNonActive = function (x,y) {
	// 	cell = this.gL[context];
	// }

	this.go = function () {
		// console.log("--SEARCH");
		var hit = false;

		for (this.currentIndex; this.currentIndex < this.gW ** 2; this.currentIndex++) {
			const cell = this.gL[this.currentIndex];
			if (cell.isActive() && (cell.getRandAdjacent() != null)) {
				hit = true;
				context.setCurrentIndex(this.currentIndex);
				break;
			}
		}

		if (hit) {
			context.change(new RandConnect(context));
		} else {
			// console.log("Search: All cells populated");
		}
	}
}

var RandConnect = function (context) {
	this.context = context;
	this.gL = this.context.getGL();
	this.gW = this.context.getGW();
	this.currentIndex = this.context.getCurrentIndex();

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
		var cell = this.gL[this.currentIndex];
		var cellAdj = cell.getRandAdjacent();
		while (cellAdj != null) {

			this.connectPoints(cell,cellAdj);
			cell = cellAdj;
			cellAdj = cell.getRandAdjacent();

			if (this.context.getDelay() != 0) { await this.sleep(); }
		}
		context.change(new Search(context));
	}
}

function runHuntKill() {
	var state = new StateMachineHuntKill();
	state.start();
}

function select(id) {
	// console.log(id);
	$("div#" + id).toggleClass("selected");
}

// run(gridWidth,cellWidth,borderWidth);

// connectPoints(0,0,0,1,gridList,gridWidth);