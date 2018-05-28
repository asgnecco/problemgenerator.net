const PORT = 8080;
var dbnextid = 0;
const dburl = "mongodb://localhost:27017/";
const dbname = "mydb";
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

const express = require('express');
const app = express();
var moment = require('moment');
var mjAPI = require("mathjax-node");
var MongoClient = require('mongodb').MongoClient;

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
	
	/*MongoClient.connect(dburl, function(err, db) {
		if (err) {throw err;}
		var dbo = db.db(dbname);
		var newprob = {
			_id: dbnextid,
			answer: problemjson.answer,
			createtime: moment()
		};
		console.log("Record to be inserted: " + JSON.stringify(newprob));
		dbo.collection("problems").insertOne(newprob, function(err, res) {
			if (err) {throw err;}
			console.log("1 document inserted into 'problem' collection.");
			outputjson.problemID = dbnextid;
			dbnextid++;
			db.close();
		});
	});*/
	
	console.log("outputjson: " + JSON.stringify(outputjson));
	res.json(outputjson);//Return outputjson
});

app.get('/check/:probid/:answer', function (req, res) {
	var outputjson={};
	
	outputjson.problemID = req.params.probid;
	
	/*MongoClient.connect(dburl, function(err, db) {
		if (err) {throw err;}
		var dbo = db.db(dbname);
		var requirements = {
			_id: req.params.probid
		};
		dbo.collection("problems").findOne(requirements, function(err, result) {
			if (err) {throw err;}
			console.log(result.answer);
			outputjson.correctAnswer = result.answer;
			db.close();
		});
	});
	if(req.params.answer.replace(/\s+/g, '').localeCompare(outputjson.correctAnswer.replace(/\s+/g, ''))==0) {
		outputjson.correct = true;
	} else {
		outputjson.correct = false;
	}
	*/
	
	console.log("outputjson: " + JSON.stringify(outputjson));
	res.json(outputjson);//Return outputjson
});

app.get('/topics', function (req, res) {
	res.send({
		topicList: topicsList
	});
});

app.get('/'+dbname, function (req, res) {
	/*MongoClient.connect(dburl, function(err, db) {
 		if (err) {throw err;}
		var dbo = db.db(dbname);
		dbo.collection("problems").find({}).toArray(function(err, result) {
			if (err) {throw err;}
			res.send(result);
			db.close();
		});
	});*/
});

app.listen(PORT);
console.log("Hosted on port " + PORT);
