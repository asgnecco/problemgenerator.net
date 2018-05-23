const express = require('express');
const PORT = 8080;
var app = express();
/* Testing mathjax so I will know how to render it - Alex*/
var mjAPI = require("mathjax-node");

var topics = [
	{id: 1, name: 'Matrix Multiplication'},
	{id: 2, name: 'Derivatives'},
	{id: 3, name: 'Integrals'},
];

mjAPI.config({
  MathJax: {
  }
});

mjAPI.start();

var exampleMath = 'E=\\int_a^b \\frac{\\sqrt{x^2 + (\\sin{x})^2}}{b*x + c} dx';

/* Some examples of listeners */
app.get('/', (req, res) => {
	res.send('Successful request.');
});

app.get('/topics', (req, res) => {
	res.send(topics);
});

app.get('/math', (req, res) => {
	mjAPI.typeset({
	  math: exampleMath,
	  format: "TeX", // or "inline-TeX", "MathML"
	  svg:true,      // or svg:true, or html:true
	}, function (data) {
		if (!data.errors) {
			res.send('<html><body>' + data.svg + '</html></body>');
		}else{
			res.send('error');
		}
	});
});

app.listen(PORT);

console.log('Starting server on ' + PORT + ' open: ' + 'localhost:' + PORT);
