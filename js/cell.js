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

function setDimentions() {
	const gW = $("div.gridWidth > input").val();
	const cW = $("div.cellWidth > input").val();
	const bW = $("div.borderWidth > input").val();
	$("div.grid").css({"--grid-w":gW, "--cell-w":cW+"px", "--border-w":bW+"px"});
}

function makeGrid() {
	// x = column
	// y = row
	const gW = $("div.gridWidth > input").val();
	var gridList = [];
	$("div.grid").empty();
	for (var i = 0; i < gW ** 2; i++) {
		const x = i%gW;
		const y = Math.floor(i/gW);
		// $("div.grid").append('<div class="cell" id="x' + x + 'y' + y + '"></div>');
		$("div.grid").append('<div class="cell rightBorder leftBorder topBorder bottomBorder" id="x' + x + 'y' + y + '" onclick="select(this.id)"></div>');
		gridList.push(new Cell(x,y,gW));
	}
	for (var i = 0; i < gW ** 2; i++) {
		// console.log(i);
		gridList[i].setAdjacent(gridList);
	}
	gridList[0].setActive(true);
	return gridList;
}