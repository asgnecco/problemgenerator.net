var http = require('http');
var generator = require('./practice-generator');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/json'});
	
	var problemjson={};
	var navurl=req.url.toLowerCase();
	
	if(navurl.localeCompare("/navtoproblems/derivatives")==0) {
		problemjson=generator.getDerivativeProblem();
	}
	
	res.write(JSON.stringify(problemjson));
	res.end();
}).listen(8080);