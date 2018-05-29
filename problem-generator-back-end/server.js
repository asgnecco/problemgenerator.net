const express = require('express');
const PORT = 8080;
var app = express();
var mjAPI = require("mathjax-node");

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


mjAPI.start();

function texToSVG(problem){
	problem = null;
    mjAPI.typeset({
        math: exampleMath,
        format: "TeX", // or "inline-TeX", "MathML"
        svg:true,      // or svg:true, or html:true
    }, function (data) {
        if (!data.errors) {
            problem = data.svg;
        }else{
            res.send('error');
        }
    });
	return problem;
}


var topicsList = [
    {
        topicName: 'Calculus',
        id: 1,
        subtopics: [
            {name: 'Derivatives', id: 1},
            {name: 'Integrals', id: 2}
            ]
    },
    {
        topicName: 'Algebra',
        id: 2,
        subtopics: [
            {name: 'Completing the Square', id: 3},
            {name: 'Simpling Radials', id: 4}
            ]
    },
    {
        topicName: 'Linear Algebra',
        id: 3,
        subtopics: [
            {name: 'Euler Reduction', id: 5},
            {name: 'Inverse Matrices', id: 6}
            ]
    }
];

var num = Math.random();
var exampleMath = 'E=\\int_a^b \\frac{\\sqrt{x^2 + (\\sin{' + num + '})^2}}{b*x + c} dx';

/* Some examples of listeners */

app.get('/api/topics', (req, res) => {
	res.send({
		topicList: topicsList
	});
});

app.get('/generate/', (req, res) => {
	res.send({svg: texToSVG(exampleMath)})
});
// Difficulty is a number between 0 and 3 0 = Easy 4 = Insane
app.get('/api/generate/:topic/:difficulty', function (req, res) {
    // Topic is passed by ID see above
    console.log('Request with ID: ' + req.params.topic + ' and difficulty: ' + req.params.difficulty);
    res.send({
        problem: {
            id: 2,
            description: 'Solve the integral:' + Math.random(),
            svg: texToSVG(exampleMath)
        }
    });
});

// URL encoded
app.get('/api/check/:id/:answer', function (req, res) {
    // Topic is passed by ID see above
    console.log('Answer request with problem: ' + req.params.answer + 'Problem ID: ' + req.params.id);
    res.send({
        correct: 1 // 1 for true 0 for false or a number in between
    });
});

app.listen(PORT);

console.log('Starting server on ' + PORT + ' open: ' + 'localhost:' + PORT);
