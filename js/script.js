// TODO: try and do the import shit,
// - like it cant be that hard lol,
// - maybe ask tony,

class Cell {
	constructor (x,y,mapWidth) {
		this.x = x;
		this.y = y;
		this.adjacent = [];
		if (x-1 >= 0) {
			this.adjacent.push([x-1,y]);
		}
		if (x+1 < mapWidth) {
			this.adjacent.push([x+1,y]);
		}
		if (y-1 >= 0) {
			this.adjacent.push([x,y-1]);
		}
		if (y+1 < mapWidth) {
			this.adjacent.push([x,y+1]);
		}
		// console.log(this.adjacent);
		this.connected = [];
		this.mapWidth = mapWidth;
		this.active = false;
	}

	getRandAdjacecnt() {
		return this.adjacent[Math.floor(Math.random()*this.adjacent.length)];
	}

	getCoordinates() {
		return [this.x, this.y];
	}

	isAjacent(x,y) {
		for (var i = 0; i < this.adjacent.length; i++) {
			if(this.adjacent[i][0] == x && this.adjacent[i][1] == y) { 
				return true;
			}
		}
		return false;
	}

	isConnected(x,y) {
		for (var i = 0; i < this.connected.length; i++) {
			if(this.connected[i][0] == x && this.connected[i][1] == y) { 
				return true;
			}
		}
		return false;
	}

	isActive() {
		return this.active;
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

	connect(x,y) {
		if (this.isAjacent(x,y) && !this.isConnected(x,y)) {
			this.connected.push([x,y]);
			var classA = "";
			var classB = "";
			if(this.x < x) {
				classA = "leftBorder";
				classB = "rightBorder";
			} else if (x < this.x) {
				classA = "rightBorder";
				classB = "leftBorder";
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
	}
}

// function listIndex(x,y,gridWidth) {
// 	return (y*gridWidth) + x;
// }

function connectPoints(x1,y1,x2,y2,gridList,gridWidth) {
	console.log(gridList[index(x1,y1,gridWidth)]);
	console.log(gridList[index(x2,y2,gridWidth)]);

	gridList[index(x1,y1,gridWidth)].connect(x2,y2);
	gridList[index(x1,y1,gridWidth)].setActive(true);

	gridList[index(x2,y2,gridWidth)].connect(x1,y1);
	gridList[index(x2,y2,gridWidth)].setActive(true);
}

// gridList = makeGrid(gridWidth, cellWidth, borderWidth);
// gridList[index(0,0,gridWidth)].setActive(true);

var StateMachine = function (gridWidth, cellWidth, borderWidth) {
	const gW = gridWidth;
	const cW = cellWidth;
	const bW = borderWidth;
	var gL;
	var currentIndex;

	var currentState = new Search(this);

	this.setCurrentIndex = function(i) {
		currentIndex = i;
	}

	this.getCurrentIndex = function() {
		return currentIndex;
	}

	this.getGW = function() {
		return gW;
	}

	this.getGL = function() {
		return gL;
	}

	this.setDimentions = function() {
		$("div.grid").css({"--grid-w":gW, "--cell-w":cW+"px", "--border-w":bW+"px"});
	}

	this.index = function (x,y) {
		return (y*gW) + x;
	}

	this.makeGrid = function() {
		// x = column
		// y = row
		var gridList = [];
		$("div.grid").empty();
		for (var i = 0; i < gW*gW; i++) {
			const x = i%gW;
			const y = Math.floor(i/gW);
			// $("div.grid").append('<div class="cell" id="x' + x + 'y' + y + '"></div>');
			$("div.grid").append('<div class="cell rightBorder leftBorder topBorder bottomBorder" id="x' + x + 'y' + y + '"></div>');
			gridList.push(new Cell(x,y,gridWidth));
		}
		return gridList;
	}

	this.change = function (state) {
		currentState = state;
		currentState.go();
	};

	this.start = function () {
		currentIndex = 0;
		gL = this.makeGrid();
		this.setDimentions();
		gL[this.index(0,0)].setActive(true);
		currentState.go();
	}
}

var Search = function (context) {
	this.context = context;
	this.gW = context.getGW();
	this.gL = context.getGL();
	this.currentIndex = context.getCurrentIndex();

	this.go = function () {
		console.log("--SEARCH");
		for (currentIndex; currentIndex < gW ** 2; currentIndex++) {
			console.log("Search: index="currentIndex);
			if (gL[currentIndex].)
		}
	}
}

var RandConnect = function (context) {
	this.context = context;

	this.go = function () {
		console.log("--RANDCONNECT");
	}
}

function run(gridWidth, cellWidth, borderWidth) {
	var state = new StateMachine(gridWidth, cellWidth, borderWidth);
	state.start();
}

const gridWidth = 5;
const cellWidth = 50;
const borderWidth = 2;

run(gridWidth,cellWidth,borderWidth);

// connectPoints(0,0,0,1,gridList,gridWidth);