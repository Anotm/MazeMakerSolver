gridList = [];

// $("div.genBtns").load(function(){
// 	disableSolveButtons();
// });

function setGridList(list) {
	gridList = list;
	// console.log(gridList);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function select(id) {
	// console.log(id);
	$("div#" + id).toggleClass("selected");
}

function selectCell(cell) {
	// console.log(id);
	id = "x" + cell.getCoordinates()[0] + "y" + cell.getCoordinates()[1];
	$("div#" + id).addClass("selected");
}

function visitCell(cell) {
	// console.log(id);
	id = "x" + cell.getCoordinates()[0] + "y" + cell.getCoordinates()[1];
	$("div#" + id).addClass("visited");
}

function setCurrentCell(cell) {
	// console.log(id);
	id = "x" + cell.getCoordinates()[0] + "y" + cell.getCoordinates()[1];
	$("div#" + id).addClass("current");
}

function removeCurrentCell(cell) {
	// console.log(id);
	id = "x" + cell.getCoordinates()[0] + "y" + cell.getCoordinates()[1];
	$("div#" + id).removeClass("current");
}

function removeHihglight() {
	$("div.selected").each(function (){
		$(this).removeClass("selected");
	});

	$("div.visited").each(function (){
		$(this).removeClass("visited");
	});

	$("div.current").each(function (){
		$(this).removeClass("current");
	});
}

function enableSolveButtons() {
	$("button.solve").each(function (){
		$(this).prop('disabled', false);
	});
}

function disableSolveButtons() {
	$("button.solve").each(function (){
		$(this).prop('disabled', true);
	});
}

function enableGenButtons() {
	$("button.gen").each(function (){
		$(this).prop('disabled', false);
	});
}

function disableGenButtons() {
	$("button.gen").each(function (){
		$(this).prop('disabled', true);
	});
}