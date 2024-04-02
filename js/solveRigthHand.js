function CW(dir) {
	return [-1 * dir[1], dir[0]];
}

function CCW(dir) {
	return [dir[1], -1 * dir[0]];
}

function isExit(cell) {
	this.cellCoor = cell.getCoordinates();
	this.exitCellCoor = gridList[gridList.length-1].getCoordinates();
	return (this.cellCoor[0] == this.exitCellCoor[0] && this.cellCoor[1] == this.exitCellCoor[1]);
}

function canMove(cell, dir, rightTurn) {
	this.coor = cell.getCoordinates();
	if (rightTurn) {
		this.right = CW(dir);
		this.newCoor = [coor[0]+right[0], coor[1]+right[1]];
	} else {
		this.newCoor = [coor[0]+dir[0], coor[1]+dir[1]];
	}
	this.list = cell.getConnected();

	this.connectedCell = gridList[ this.newCoor[1]*Math.sqrt(gridList.length) + this.newCoor[0] ];
	if (cell.isConnected(this.connectedCell)) {
		return this.connectedCell;
	}

	return null;
}

async function solveRightHand() {
	disableSolveButtons();
	removeHihglight();
	const delay = $("div.delay > input").val();
	var dir = [0,1];
	var cell = gridList[0];
	selectCell(cell);
	console.log(canMove(gridList[1], [1,0], false));
	while (!isExit(cell)) {
		var rightCell = canMove(cell, dir, true);
		var frontCell = canMove(cell, dir, false);
		if (rightCell != null) {
			dir = CW(dir);
			cell = rightCell;
			selectCell(cell);
		} else if (frontCell != null){
			cell = frontCell;
			selectCell(cell);
		} else {
			dir = CCW(dir);
		}
		if (delay != 0) { await sleep(delay); }
	}
	enableSolveButtons();
}