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
	}

	getRandAdjacecnt() {
		return this.adjacent[Math.floor(Math.random()*this.adjacent.length)];
	}

	connect([x,y]) {
		var contains = false;
		for (var i = 0; i < this.adjacent.length; i++) {
			if(this.adjacent[i][0] == x && this.adjacent[i][1] == y) { 
				var copy = this.adjacent.slice(i);
				console.log("copy", copy);
				this.adjacent = copy;
				contains = true;
				break;
			}
		}

		if (!contains) { return; }

		for (var i = 0; i < this.connected.length; i++) {
			if(this.connected[i][0] == x && this.connected[i][1] == y) { 
				return;
			}
		}

		this.connected.push([x,y]);
		console.log(this.connected);
		console.log("adjacent", this.adjacent);
	}
}

function makeGrid(gridWidth, cellWidth) {
	// x = column
	// y = row
	for (var i = 0; i < gridWidth*gridWidth; i++) {
		$("div.grid").append('<div class="cell" id="x' + i%gridWidth + 'y' + Math.floor(i/gridWidth) + '"></div>');
	}
	$("div.grid").css({"--grid-w":gridWidth, "--cell-w":cellWidth});
}

// const test = new Cell(1,1,5);
// test.connect([1,2]);
// test.connect([1,5]);

makeGrid(5,"50px");