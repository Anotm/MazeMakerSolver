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
		this.connected = [];
	}
	connect (x,y) {
		
	}
}