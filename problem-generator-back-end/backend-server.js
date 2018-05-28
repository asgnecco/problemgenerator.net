const PORT = 8080;
var dbnextid = 0;
const dburl = "mongodb://localhost:27017/";//Make sure that you change these settings on the cleardatabase.js file too
const dbname = "mydb";//Make sure that you change these settings on the cleardatabase.js file too
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
	const thisprobid = dbnextid;
	dbnextid++;
	outputjson.problemID = thisprobid;
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
		}
	});
	
	outputjson.type=problemjson.type;//Add type pair to outputjson as given from the generator
	
	MongoClient.connect(dburl, function(err, db) {
		if (err) {throw err;}
		var dbo = db.db(dbname);
		var newprob = {
			_id: thisprobid,
			answer: problemjson.answer,
			createtime: moment()
		};
		dbo.collection("problems").insertOne(newprob, function(err, res) {
			if (err) {throw err;}
			db.close();
		});
	});
	
	res.json(outputjson);//Return outputjson
});

app.get('/check/:probid/:answer', async function (req, res) {
	var outputjson={};
	
	outputjson.problemID = req.params.probid;
	const db = await MongoClient.connect(dburl);
	try {
		var result = await db.db(dbname).collection("problems").findOne({_id: Number(req.params.probid)});
		if(result == null) {outputjson.correctAnswer = "Problem not in database";}
		else {
			outputjson.correctAnswer = await result.answer;
			db.db(dbname).collection("problems").deleteOne({_id: Number(req.params.probid)});
		}
	} finally {
		db.close();
	}
	
	var urlanswer = String(req.params.answer).replace(/\s+/g, '');
	var dbanswer = String(outputjson.correctAnswer).replace(/\s+/g, '');
	if(urlanswer.localeCompare(dbanswer)==0) {
		outputjson.correct = true;
	} else {
		outputjson.correct = false;
	}
	
	res.json(outputjson);//Return outputjson
});

app.get('/topics', function (req, res) {
	res.send({
		topicList: topicsList
	});
});

app.get('/'+dbname, function (req, res) {
	MongoClient.connect(dburl, function(err, db) {
 		if (err) {throw err;}
		var dbo = db.db(dbname);
		dbo.collection("problems").find({}).toArray(function(err, result) {
			if (err) {throw err;}
			res.send(result);
			db.close();
		});
	});
});

app.listen(PORT);
console.log("Hosted on port " + PORT);
