const express = require('express');
const PORT = 8080;
const app = express();
var mjAPI = require("mathjax-node");
var generator = require('./practice-generator');
var topicsList = [
    {
        topicName: 'Calculus',
        id: 1,
        subtopics: [
            {name: 'Derivatives', id: 1},
            ]
    }
];

mjAPI.config({ //Configuration for MathJax
	MathJax: {
		// traditional MathJax configuration
	}
});
mjAPI.start();

app.get('/', function (req,res) {
	res.send("Where do you plan to go now?");
});

app.get('/generate/:topic/:difficulty', function (req, res) {
	//Places to store JSON from generator and JSON that is to be returned
	var problemjson={};
	var outputjson={};
	
	if(req.params.topic.toLowerCase().localeCompare("derivatives")==0) {//If the request is for a derivative problem
		problemjson=generator.getDerivativeProblem();
	}
	
	mjAPI.typeset({//Create svg from problemjson.question
		math: problemjson.question,
		format: "TeX",
		svg:true,
	}, function (data) {
		if(!data.errors) {
			outputjson.problem=data.svg;//Put the svg into the outputjson
			console.log("SVG successfully generated.");
		} else {
			console.log("Failure in creating svg image out of problem.");//Log if the svg creation fails
		}
	});
	
	outputjson.type=problemjson.type;//Add type pair to outputjson as given from the generator
	res.json(outputjson);//Return outputjson
});

app.get('/topics', function (req, res) {
	res.send({
		topicList: topicsList
	});
});

app.listen(PORT);
console.log("Hosted on port " + PORT);
