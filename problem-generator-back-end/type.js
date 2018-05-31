var eqType;
var baseValue;
var yValue;
var expValue;
var hasSqrt;
var sqrtCon;

exports.setType = function(type)
{
	eqType = type;
	if (eqType === "pow" || eqType === "exp")
	{
		var random = Math.floor(Math.random() * 3 + 2);
		expValue = random;
		baseValue = random;
	}
	var ran = Math.floor(Math.random() * 5 + 1);
	if (ran === 1){
		hasSqrt = true;
		sqrtCon = Math.floor(Math.random() * 17 + 4);
	}
	else
		hasSqrt = false;
}

exports.getValue = function(xValue) {

	
	switch(eqType)
        {
            case "pow" :
                yValue = Math.pow(xValue, expValue);
                break;
            case "cos" :
                yValue = Math.cos(xValue);
                break;
            case "sin" :
                yValue = Math.sin(xValue);
                break;
            case "tan" :
                yValue = Math.tan(xValue);
                break;
            case "exp" :
                yValue = Math.pow(baseValue, xValue);
                break;
            case "expE" :
                yValue = Math.pow(Math.E, xValue);
                break;
            default :
                yValue = Math.log(xValue);
                break;
	}
	if(hasSqrt)
		return Math.sqrt(yValue + sqrtCon);
	return yValue;
}

exports.getFormulaString = function()
{
	//console.log("THE TYPE IS: " + eqType);
	if (hasSqrt)
	{
		if(eqType==="cos" || eqType==="sin" || eqType==="tan" || eqType==="ln")
			return "((" + eqType + "(x) + " + sqrtCon + ")^1/2)";
		else if(eqType==="pow")
			return "(((x^" + expValue + ") + " + sqrtCon + ")^1/2)";
		else if(eqType==="exp")
			return "(((" + baseValue + "^x) + " + sqrtCon + ")^1/2)";
		else if (eqType==="expE")
			return "(((e^x) + " + sqrtCon + ")^1/2)";
		return "broken";
	}
	else {
		if(eqType==="cos" || eqType==="sin" || eqType==="tan" || eqType==="ln")
			return eqType + "(x)";
		else if(eqType==="pow")
			return "(x^" + expValue + ")";
		else if(eqType==="exp")
			return "(" + baseValue + "^x)";
		else if (eqType==="expE")
			return "(e^x)";
		return "broken";
	}
}

exports.getType = function() {
	return eqType;
}

exports.toLatex = function() {
	
	if(hasSqrt){
		if (eqType === "pow"){
			return "\\sqrt(x^{" + expValue + "} + " + sqrtCon + ")";
		}
		else if (eqType === "cos" || eqType === "sin" || eqType === "tan" || eqType === "ln"){
			return "\\sqrt(\\" + eqType + "(x) + " + sqrtCon + ")";
		}
		else if (eqType === "exp"){
			return "\\sqrt(" + baseValue + "^{x} + " + sqrtCon + ")";
		}
		else if (eqType === "expE"){
			return "\\sqrt(\exp(x) + " + sqrtCon + ")";
		}
		return "broken";
	
	}
	else {
		if (eqType === "pow"){
			return "x^{" + expValue + "}";
		}
		else if (eqType === "cos" || eqType === "sin" || eqType === "tan" || eqType === "ln"){
			return "\\" + eqType + "(x)";
		}
		else if (eqType === "exp"){
			return baseValue + "^{x}";
		}
		else if (eqType === "expE"){
			return "\exp(x)";
		}
		return "broken";
	}
}


