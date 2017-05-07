var row = function(cell) {return cell%9};
var col = function(cell) {return Math.floor(cell/9)};
var box = function(cell) {return 3*Math.floor(col(cell)/3) + Math.floor(row(cell)/3)};

var getRowIndices = function(cell){ 
	var r = row(cell), rows = [];
	for ( var x=0; x<9; x++){
		rows.push(9*x+r);
	}
	return rows;
};

var getColIndices = function(cell){
	var r = col(cell), cols = [];
	for ( var x=0; x<9; x++){
		cols.push(x+9*r);
	}
	return cols;
};

var getBoxIndices = function(cell){
	var b = box(cell), boxes = [];
	var base = 27*Math.floor(b/3) + 3*Math.floor(b%3);
	for (var i=0; i< 3; i++){
		for (var j=0; j< 3; j++){
			boxes.push(base + j + 9*i)
		}
	}
	return boxes;
};

var stack = [], sudoku = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';

var checkCriteria = function check(cell, sudoku){
	var reg = /^[1-9]+$/, excluded = [];
	if (sudoku.match(reg) == null) {
		while (sudoku[cell] != '0') { cell += 1;}
		excluded = excluded.concat(getRowIndices(cell), getColIndices(cell), getBoxIndices(cell)).map( o => sudoku[o]);
		excluded = Array.from(new Set(excluded));
		Array.from('123456789').forEach(o => {if(excluded.indexOf(o) == -1) check(cell, sudoku.slice(0, cell)+o+sudoku.slice(cell+1,81) ) });
	}else{
		console.log(sudoku);
	}
};

checkCriteria(0, sudoku);
/* Prints 534678912672195348198342567859761423426853791713924856961537284287419635345286179 */
