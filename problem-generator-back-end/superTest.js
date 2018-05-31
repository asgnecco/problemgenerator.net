var equation = require("./function.js"); 				//imports a Math Function

equation.setValue(); 							//creates math equation


//console.log(getDerivative(2));
//console.log(getIntegral(2, 4));
//console.log(getSum(5));

/*for (var i = 0; i < 50; i++)
{
	equation.setValue();
	console.log(equation.getFormula());
}*/

//console.log(equation.getFormula() + "     f'(" + xVal + ")= " + equation.getDerivative(xVal));


exports.getQuestion = function(questionType)
{
	if (questionType === "summation")
	{
		var nthTerm = Math.floor(Math.random() * 13 + 3);
		var ans = getSum(nthTerm);
		return{"question": "\\sum_{n=0}^{" + nthTerm + "}" + equation.eqToLatex() + "=", "answer": ans, "type": "box"};
	}
	if(questionType === "integral")
	{
		var a = Math.floor(Math.random() * 5 + 1);
		var b = Math.floor(Math.random() * 5 + 6);
		var ans = getIntegral(a, b);
		return {"question": "\\int_{" + a + "}^{" + b + "}" + equation.eqToLatex() + "dx=", "answer": ans, "type":"box"};
	}
	if(questionType === "derivative")
	{
		var xValue = Math.floor(Math.random() * 3 + 1);
		var ans = getDerivative(xValue);
		while (ans > 50 || ans < -50){
			equation.setValue();
			ans = getDerivative(xValue);
		}
		return{"question": "\\frac{d}{dx}" + equation.eqToLatex() + "$] at x = $" + xValue, "answer": ans, "type": "box"};
	}
	if(questionType === "findValue")
	{
		var xValue = Math.floor(Math.random() * 100 + 1);
		var ans = equation.getValue(xValue);
		return{"question": "Find f(" + xValue + ") given f(x) = " + equation.eqToLatex(), "answer": ans, "type": "box"};
	}
}
	
function getSum(nthTerm){
	var sum = 0;
	for (var i = 0; i <= nthTerm; i++){
		sum += equation.getValue(i);
	}
	//console.log(equation.getFormula());
	return sum;
}

function getDerivative(xValue){
	var deltaX = 0.00000000000001;
	var a = xValue - deltaX;
	var b = xValue + deltaX;
	var fA = equation.getValue(a);
	var fB = equation.getValue(b);
	//console.log("d/dx[" + equation.getFormula() + "]   |  x = " + xValue);
	return (fB - fA) / (b - a);
}

function getIntegral(a, b){
	var area = 0;
	var deltaX = 0.000001;
	for (var i = a; i < b; i += deltaX){
		area += (deltaX / 2) * (equation.getValue(i) + equation.getValue(i + deltaX));
	}
	//console.log("Integral of: " + equation.getFormula() + " from " + a + " to " + b + " is: ");
	return area;
}