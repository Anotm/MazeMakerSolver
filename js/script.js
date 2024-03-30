// TODO: try and do the import shit,
// - like it cant be that hard lol,
// - maybe ask tony,

class Cell {
	constructor (x,y,mapWidth) {
		this.x = x;
		this.y = y;
		// console.log(this.adjacent);
		this.connected = [];
		this.mapWidth = mapWidth;
		this.active = false;
		this.adjacent = [];
	}

	setActive(b) {
		this.active = b;
		
		const divStr = "div.cell#x" + this.x + "y" + this.y;

		if (this.active) {
			$(divStr).addClass("active");
		} else {
			$(divStr).removeClass("active");
		}
	}

	setAdjacent(gL) {
		this.helper = function (x,y,gl) {
			// console.log(x + " " + y);
			var index = (y*this.mapWidth) + x;
			if (y < this.mapWidth && y >= 0 && x < this.mapWidth && x >= 0) { this.adjacent.push(gl[index]); }
		}

		// console.log("--" + this.x + " " + this.y);

		var x = this.x + 1;
		var y = this.y;
		this.helper(x,y,gL);

		x = this.x - 1;
		y = this.y;
		this.helper(x,y,gL);

		x = this.x;
		y = this.y + 1;
		this.helper(x,y,gL);

		x = this.x;
		y = this.y - 1;
		this.helper(x,y,gL);

		// console.log(this.adjacent);
	}

	getRandAdjacent() {
		var list = []
		this.adjacent.forEach((cell) => {
			if (!cell.isActive()) { list.push(cell); }
		});
		if (list.length == 0) { return null; }
		return list[Math.floor(Math.random()*list.length)];
	}

	getCoordinates() {
		return [this.x, this.y];
	}

	isAjacent(cell) {
		cellCoordinates = cell.getCoordinates();
		x = cellCoordinates[0];
		y = cellCoordinates[1];
		if ((x-1 == this.x || x+1 == this.x) && y == this.y) {
			return true;
		}
		if ((y-1 == this.y || y+1 == this.y) && x == this.x) {
			return true
		}
		return false;
	}

	isConnected(cell) {
		cellCoordinates = cell.getCoordinates();
		x = cellCoordinates[0];
		y = cellCoordinates[1];
		for (var i = 0; i < this.connected.length; i++) {
			if(this.connected[i].getCoordinates[0] == x && this.connected[i].getCoordinates[1] == y) { 
				return true;
			}
		}
		return false;
	}

	isActive() {
		return this.active;
	}

	connect(cell) {
		if (this.isAjacent(cell) && !this.isConnected(cell)) {
			this.connected.push(cell);
			var classA = "";
			var classB = "";
			if(this.x < x) {
				classA = "rightBorder";
				classB = "leftBorder";
			} else if (x < this.x) {
				classA = "leftBorder";
				classB = "rightBorder";
			} else if(this.y < y) {
				classA = "bottomBorder";
				classB = "topBorder";
			} else if (y < this.y) {
				classA = "topBorder";
				classB = "bottomBorder";
			}
			$("div.cell#x" + this.x + "y" + this.y).removeClass(classA);
			$("div.cell#x" + x + "y" + y).removeClass(classB);
		}
		this.setActive(true);
	}
}

// gridList = makeGrid(gridWidth, cellWidth, borderWidth);
// gridList[index(0,0,gridWidth)].setActive(true);

var StateMachine = function (delay, gridWidth, cellWidth, borderWidth) {
	this.delay = delay;
	this.gW = gridWidth;
	this.cW = cellWidth;
	this.bW = borderWidth;
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

	this.setDimentions = function() {
		$("div.grid").css({"--grid-w":this.gW, "--cell-w":this.cW+"px", "--border-w":this.bW+"px"});
	}

	this.makeGrid = function() {
		// x = column
		// y = row
		var gridList = [];
		$("div.grid").empty();
		for (var i = 0; i < this.gW ** 2; i++) {
			const x = i%this.gW;
			const y = Math.floor(i/this.gW);
			// $("div.grid").append('<div class="cell" id="x' + x + 'y' + y + '"></div>');
			$("div.grid").append('<div class="cell rightBorder leftBorder topBorder bottomBorder" id="x' + x + 'y' + y + '" onclick="select(this.id)"></div>');
			gridList.push(new Cell(x,y,this.gW));
		}
		for (var i = 0; i < this.gW ** 2; i++) {
			// console.log(i);
			gridList[i].setAdjacent(gridList);
		}
		gridList[0].setActive(true);
		return gridList;
	}

	this.change = function (state) {
		this.currentState = state;
		this.currentState.go();
	};

	this.start = function () {
		this.currentIndex = 0;
		this.gL = this.makeGrid();
		this.setDimentions();

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

function run() {
	const delay = $("div.delay > input").val();
	const gridWidth = $("div.gridWidth > input").val();
	const cellWidth = $("div.cellWidth > input").val();
	const borderWidth = $("div.borderWidth > input").val();
	var state = new StateMachine(delay, gridWidth, cellWidth, borderWidth);
	state.start();
}

function select(id) {
	// console.log(id);
	$("div#" + id).toggleClass("selected");
}

// run(gridWidth,cellWidth,borderWidth);

// connectPoints(0,0,0,1,gridList,gridWidth);