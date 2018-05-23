const express = require('express');
const PORT = 8080;
var app = express();

var topics = [
	{id: 1, name: 'Matrix Multiplication'},
	{id: 2, name: 'Derivatives'},
	{id: 3, name: 'Integrals'},
];

/* Some examples of listeners */
app.get('/', (req, res) => {
	res.send('Successful request.');
});

app.get('/topics', (req, res) => {
	res.send(topics);
});

app.listen(PORT);

console.log('Starting server on ' + PORT + ' open: ' + 'localhost:' + PORT);
