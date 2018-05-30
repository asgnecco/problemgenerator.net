const PORT = 8080;
const dburl = "mongodb://localhost:27017/";//Make sure that you change these settings on the cleardatabase.js file too
const dbname = "mydb";//Make sure that you change these settings on the cleardatabase.js file too
var generator = require('./practice-generator');
var topicsList = [
    {
        topicName: 'Calculus',
        id: 1,
        subtopics: [
            {name: 'Derivatives', id: 1}
            ]
    }
];

const express = require('express');
const app = express();
var math = require('mathjs');
var moment = require('moment');
var mjAPI = require("mathjax-node");
var MongoClient = require('mongodb').MongoClient;


// Allow cross reference
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var dbnextid = 0;
//use db.collection.find's result to figure out what to set dbnextid and/or if to do it.
async function initdbnextid () {
	const db = await MongoClient.connect(dburl);
	var result = await db.db(dbname).collection("problems").find();
	var highestid = 0;
	var waste = await result.each(function(err, item) {
		if(item != null) {
			if(item._id > highestid) {highestid = item._id;}
		} else {
			dbnextid = highestid + 1;
		}
	});
	db.close();
}
initdbnextid();

mjAPI.config({ //Configuration for MathJax
	MathJax: {
		// traditional MathJax configuration
	}
});
mjAPI.start();

app.get('/', function (req,res) {
	res.send("Where do you plan to go now?");
});

app.get('/api/generate/:topic/:difficulty', async function (req, res) {
	//Places to store JSON from generator and JSON that is to be returned
	var problemjson={};
	var outputjson={};
	const thisprobid = dbnextid;
	dbnextid++;
	outputjson.id = thisprobid;

	if(req.params.topic == 1) {//If the request is for a derivative problem
		problemjson = await generator.getDerivativeProblem();
	}
	//onsole.log(JSON.stringify(problemjson));
	const data = await mjAPI.typeset({//Create svg from problemjson.question
		math: problemjson.question,
		format: "TeX",
		svg:true,
	});
	if(!data.errors) {
		outputjson.svg= await data.svg;//Put the svg into the outputjson
	}

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
	outputjson.description = "Solve the following problem:";

	res.json({problem: outputjson});//Return outputjson
});

app.get('/api/check/:probid/:answer', async function (req, res) {
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
	//console.log("1: " + req.params.answer);
	//console.log("2: " + outputjson.correctAnswer);
	var urlanswer = math.simplify(String(req.params.answer)).toString();
	var dbanswer = math.simplify(String(outputjson.correctAnswer)).toString();
	if(urlanswer.localeCompare(dbanswer)==0) {
		outputjson.correct = 10;
	} else {
		outputjson.correct = -10;
	}
	
	res.json(outputjson);//Return outputjson
});

app.get('/api/topics', (req, res) => {
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
