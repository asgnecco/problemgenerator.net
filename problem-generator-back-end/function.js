/*var f = require("./type.js");
var types = ["sin", "cos", "tan", "expE", "exp", "pow", "ln"];
for(var i = 0; i < 20; i++)
{
	var index = require("./type.js");
	var randXVal = Math.floor(Math.random() * 20 + 1);
	index.setType(types[Math.floor(Math.random()* 7)]);
	console.log(index.getFormulaString() + " |  x = " + randXVal );
	console.log(index.getValue(randXVal) + "\n");
}*/

var types = ["sin", "cos", "tan", "expE", "exp", "pow", "ln"];

var constant = 0.0;
var isMultiplied;
var numberOfTypes;

var s = require("./type.js");
var t = require("./type2.js");

exports.setValue = function() {
	t.setType(types[Math.floor(Math.random()* types.length)]);
	s.setType(types[Math.floor(Math.random()* types.length)]);
	numberOfTypes = Math.floor(Math.random() * 2 + 1);
	constant = Math.floor(Math.random() * 9 + 2);
	if (Math.floor(Math.random() * 2) === 1)
		isMultiplied = true;
	else
		isMultiplied = false;
	while((t.getType() === s.getType())){
		//console.log(t.getType());
		//console.log(s.getType());
		s.setType(types[Math.floor(Math.random() * types.length)]);
	}
}

exports.getValue = function(xValue){
	if(isMultiplied)
		return constant * s.getValue(xValue) * t.getValue(xValue);
	else if (!isMultiplied && numberOfTypes === 2)
		return constant * (s.getValue(xValue) / t.getValue(xValue));
	else
		return constant * s.getValue(xValue);
}

exports.getFormula = function(){
	if (isMultiplied)
		return constant + "*" + s.getFormulaString() + "*" + t.getFormulaString();
	else if(!isMultiplied && numberOfTypes === 2)
		return constant + "*(" + s.getFormulaString() + "/" + t.getFormulaString() + ")";
	else
		return constant + "*" + s.getFormulaString();
}

exports.eqToLatex = function(){
	if (isMultiplied)
		return constant + "\\times" + s.toLatex() + "\\times" + t.toLatex();
	else if(!isMultiplied && numberOfTypes === 2)
		return constant + "\\times" + "\\frac{" + s.toLatex() + "}{" + t.toLatex() + "}";
	else
		return constant + "\\times" + s.toLatex();
}