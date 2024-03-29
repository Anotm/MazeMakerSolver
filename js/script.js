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
		this.set = false;
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

	isSet() {
		return this.set;
	}

	connect(x,y) {
		if (this.isAjacent(x,y) && !this.isConnected(x,y)) {
			this.connected.push([x,y]);
			// TODO: add the cnnected to the other list
			var classA = "";
			var classB = "";
			if(this.x < x) {
				classA = "rightBorder";
				classB = "leftBorder";
			} else if (x < this.x) {
				classA = "leftBorder";
				classB = "rightBorder";
			} else if(this.y < y) {
				classA = "topBorder";
				classB = "bottomBorder";
			} else if (y < this.y) {
				classA = "bottomBorder";
				classB = "topBorder";
			}
			$("div.cell#x" + this.x + "y" + this.y).removeClass(classA);
			$("div.cell#x" + x + "y" + y).removeClass(classB);
		}
	}
}

function setDimentiosn(gridWidth, cellWidth, borderWidth) {
	$("div.grid").css({"--grid-w":gridWidth, "--cell-w":cellWidth+"px", "--border-w":borderWidth+"px"});
}

function makeGrid(gridWidth, cellWidth, borderWidth) {
	// x = column
	// y = row
	var gridList = [];
	$("div.grid").empty();
	for (var i = 0; i < gridWidth*gridWidth; i++) {
		const x = i%gridWidth;
		const y = Math.floor(i/gridWidth);
		// $("div.grid").append('<div class="cell" id="x' + x + 'y' + y + '"></div>');
		$("div.grid").append('<div class="cell rightBorder leftBorder topBorder bottomBorder" id="x' + x + 'y' + y + '"></div>');
		gridList.push(new Cell(x,y,gridWidth));
	}
	setDimentiosn(gridWidth, cellWidth, borderWidth);
	return gridList;
}

function index(x,y,gridWidth) {
	return (y*gridWidth) + x;
}


const gridWidth = 5;
const cellWidth = 50;
const borderWidth = 2;

gridList = makeGrid(gridWidth, cellWidth, borderWidth);
gridList[index(0,0,gridWidth)].connect(1,0)