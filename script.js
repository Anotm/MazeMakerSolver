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
		console.log(this.adjacent);
		this.connected = [];
		this.mapWidth = mapWidth;
		this.set = false;
	}

	getRandAdjacecnt() {
		return this.adjacent[Math.floor(Math.random()*this.adjacent.length)];
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

	connect(x,y) {
		if (isAjacent(x,y) && !isConnected(x,y)) {
			this.connected.push([x,y]);
		}
	}

	isSet(){
		return this.set;
	}

	drawBorders() {
		for (var i = 0; i < this.adjacent.length; i++) {
			cellX = this.adjacent[i][0];
			cellY = this.adjacent[i][1];
			
			if(!isConnected(cellX,cellY)) { 
				return true;
			}
		}
		return false;
	}
}

function setDimentiosn(gridWidth, cellWidth, borderWidth) {
	$("div.grid").css({"--grid-w":gridWidth, "--cell-w":cellWidth+"px", "--border-w":borderWidth+"px"});
}

function makeGrid(gridWidth, cellWidth, borderWidth) {
	// x = column
	// y = row
	$("div.grid").empty();
	for (var i = 0; i < gridWidth*gridWidth; i++) {
		$("div.grid").append('<div class="cell" id="x' + i%gridWidth + 'y' + Math.floor(i/gridWidth) + '"></div>');
	}
	setDimentiosn(gridWidth, cellWidth, borderWidth);
}



// const test = new Cell(1,1,5);
// test.connect([1,2]);
// test.connect([1,5]);

makeGrid(5,50,2);