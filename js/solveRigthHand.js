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

function isEntrance(cell) {
	this.cellCoor = cell.getCoordinates();
	return (this.cellCoor[0] == 0 && this.cellCoor[1] == 0);
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
	disableGenButtons();
	disableSolveButtons();
	removeHihglight();

	const delay = $("div.delay > input").val();
	var dir = [0,1];
	var cell = gridList[0];
	selectCell(cell);

	while (!isExit(cell)) {
		var rightCell = canMove(cell, dir, true);
		var frontCell = canMove(cell, dir, false);
		if (rightCell != null) {
			removeCurrentCell(cell);
			dir = CW(dir);
			cell = rightCell;
			selectCell(cell);
			setCurrentCell(cell);
		} else if (frontCell != null){
			removeCurrentCell(cell);
			cell = frontCell;
			selectCell(cell);
			setCurrentCell(cell);
		} else {
			dir = CCW(dir);
		}
		if (delay != 0) { await sleep(delay); }
	}

	enableGenButtons();
	enableSolveButtons();
}

async function solveRightHandImproved() {
	disableGenButtons();
	disableSolveButtons();
	removeHihglight();

	const delay = $("div.delay > input").val();
	var memory = [];
	for (var i = 0; i < gridList.length; i++) {
		memory.push(null);
	}
	var dir = [0,1];
	var cell = gridList[0];
	visitCell(cell);
	setCurrentCell(cell);

	while (!isExit(cell)) {
		var rightCell = canMove(cell, dir, true);
		var frontCell = canMove(cell, dir, false);
		if (rightCell != null) {
			removeCurrentCell(cell);
			const index = rightCell.getCoordinates()[1]*Math.sqrt(memory.length) + rightCell.getCoordinates()[0];
			if (memory[index] == null) {
				memory[ index ] = cell;
			}
			dir = CW(dir);
			cell = rightCell;
			visitCell(cell);
			setCurrentCell(cell);
		} else if (frontCell != null){
			removeCurrentCell(cell);
			const index = frontCell.getCoordinates()[1]*Math.sqrt(memory.length) + frontCell.getCoordinates()[0];
			if (memory[index] == null) {
				memory[ index ] = cell;
			}
			cell = frontCell;
			visitCell(cell);
			setCurrentCell(cell);
		} else {
			dir = CCW(dir);
		}
		if (delay != 0) { await sleep(delay); }
	}

	while (!isEntrance(cell)) {
		if (cell == null) {
			console.log("broke");
			return;
		}
		selectCell(cell);
		cell = memory[ cell.getCoordinates()[1]*Math.sqrt(memory.length) + cell.getCoordinates()[0] ];
		if (delay != 0) { await sleep(delay); }
	}

	selectCell(cell);

	enableGenButtons();
	enableSolveButtons();
}
